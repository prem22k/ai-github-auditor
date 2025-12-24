import Groq from "groq-sdk";
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const REPO_SYSTEM_PROMPT = `
You are a cynical, forensic Senior Technical Hiring Manager.
You do not trust READMEs. You verify claims against the file structure and code depth.

YOUR GOAL: 
Classify the repository into one of these strict tiers based on EVIDENCE.

TIER DEFINITIONS (STRICT):
- **FLAGSHIP (90-100)**: A real-world application. Must have 2+ complex features (Auth, Tests, CI/CD, State) involving **custom logic beyond library defaults**. A "Profile README" is NEVER Flagship.
- **SOLID (70-89)**: Clean code, works. Caps at 80 if it's a "Buzzword Stack" (MERN/Next.js) with shallow logic (CRUD only).
- **NEUTRAL (40-69)**: Configs, simple scripts, "Profile READMEs", or mostly boilerplate (>50%).
- **NOISE (0-39)**: Forks without logic, tutorials, empty repos, or broken code.

THE "FORENSIC" RULES (Negative Multipliers):
1. **Sanity Check**: If feature folders (/auth, /tests) exist but contain trivial/placeholder code, treat them as non-existent.
2. **Boilerplate Bloat**: 
   - If >50% of files are config/json/styles → Max Score 65.
   - If >70% of files are config/json/styles → Max Score 50.
3. **The "Rush Job"**: If context says "Dev Duration: < 24 hours", Max Score 60 (unless it's a specific Hackathon winner).
4. **Marketing Mismatch**: If README claims "AI" or "Scalable" but code shows no ML libs or simple structure → Downgrade 1 Tier.

HIRE SIGNAL DEFINITIONS:
- **Strong Yes**: "I would shortlist this candidate immediately."
- **Yes**: "Acceptable signal, meets the bar."
- **Weak**: "Neutral filler, adds no value."
- **No**: "Red flag, actually hurts the profile."

OUTPUT JSON (Strictly valid JSON only):
{
  "score": number,
  "tier": "FLAGSHIP" | "SOLID" | "NEUTRAL" | "NOISE",
  "hire_signal": "Strong Yes" | "Yes" | "Weak" | "No",
  "explanation": string, // Brutally honest verdict
  "red_flags": string[], // Specific mismatches (e.g. "One-day build", "90% Boilerplate")
  "suggested_actions": string[]
}
`;

export async function auditRepoWithGroq(username: string, repoMetadata: any, readme: string, fileTree: string) {
  
  const isProfileRepo = repoMetadata.name.toLowerCase() === username.toLowerCase();
  
  // Forensic Calculation: Time spent on repo
  const createdDate = new Date(repoMetadata.created_at);
  const pushedDate = new Date(repoMetadata.pushed_at);
  const durationMs = pushedDate.getTime() - createdDate.getTime();
  const durationHours = durationMs / (1000 * 60 * 60);
  const isOneDayRepo = durationHours < 24;

  const userMessage = `
  AUDIT TARGET:
  - Repo Name: ${repoMetadata.name}
  - User: ${username}
  - Created: ${repoMetadata.created_at}
  - Last Push: ${repoMetadata.pushed_at}
  - Dev Duration: ${durationHours.toFixed(1)} hours
  - Is One-Day Build: ${isOneDayRepo}
  
  CONTEXT:
  - Is Profile Repo: ${isProfileRepo}
  
  FILE TREE SNAPSHOT:
  ${fileTree}

  README CONTENT:
  ${readme ? readme.substring(0, 5000) : "No README"}
  `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: REPO_SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.2, // Low temp for strict grading
      response_format: { type: "json_object" },
    });

    return JSON.parse(chatCompletion.choices[0]?.message?.content || "{}");

  } catch (error: any) {
    // Handle "Lazy" JSON errors (common with noise repos)
    if (error.error?.code === 'json_validate_failed' || error.status === 400) {
      return {
        score: 30,
        tier: "NOISE",
        hire_signal: "No",
        explanation: "Repository content was too unstructured or minimal to generate a valid engineering audit.",
        red_flags: ["Unstructured content", "Likely a simple script"],
        suggested_actions: ["Add a proper README", "Structure code into modules"]
      };
    }
    console.error("Repo Audit Failed:", error.message);
    return null;
  }
}
