import { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '../config';

// Define the shape of the AI result
export interface AiAuditResult {
  score: number;
  tier: "FLAGSHIP" | "SUPPORTING" | "NEUTRAL" | "NOISE";
  verdict: string;
  reasoning: {
    recruiter_impression: string;
    strengths: string[];
    weaknesses: string[];
  };
}

export const useAiAuditQueue = (repos: any[], username: string) => {
  const [results, setResults] = useState<Record<string, any>>({});
  const [progress, setProgress] = useState({ completed: 0, total: 0 });
  const [isComplete, setIsComplete] = useState(false);
  const [paused, setPaused] = useState(false);
  
  // Use a ref to track if we've started processing to avoid double-firing in strict mode
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Safety check: If no repos or already started, do nothing
    if (!repos || repos.length === 0 || hasStartedRef.current) return;

    hasStartedRef.current = true;
    setProgress({ completed: 0, total: repos.length });

    const processQueue = async () => {
      // Create a local copy to iterate over
      for (const repo of repos) {
        
        // 1. Check if paused (though in this simple version, we just wait on error)
        
        try {
          console.log(`Analyzing ${repo.name}...`);
          
          // Using fetch instead of axios to avoid dependency issues
          const response = await fetch(`${API_BASE_URL}/api/audit/analyze-repo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, repoName: repo.name }),
          });

          if (response.status === 429) {
             throw { response: { status: 429 } }; 
          }

          if (!response.ok) {
             throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          // SUCCESS: Update state
          setResults(prev => ({
            ...prev,
            [repo.name]: { status: 'completed', result: data } // Maintain compatibility with Audit.tsx structure
          }));

        } catch (error: any) {
          console.error(`Error auditing ${repo.name}:`, error);
          
          // If Rate Limit (429), wait 60s
          if (error.response && error.response.status === 429) {
            console.warn("⚠️ Rate Limit Hit. Pausing for 60s...");
            setPaused(true);
            await new Promise(resolve => setTimeout(resolve, 60000));
            setPaused(false);
            // Ideally retry here, but for simplicity we skip to keep moving
          }
          
          setResults(prev => ({
            ...prev,
            [repo.name]: { status: 'error', error: 'Failed' }
          }));
        }

        // UPDATE PROGRESS
        setProgress(prev => ({ ...prev, completed: prev.completed + 1 }));

        // SERIAL DELAY: Wait 10 seconds between requests
        await new Promise(resolve => setTimeout(resolve, 10000));
      }

      setIsComplete(true);
    };

    processQueue();

  }, [repos, username]); // Only re-run if repos array changes

  return { results, progress, isComplete, paused };
};
