import React, { useState } from 'react';
import axios from 'axios';

interface RepoTableProps {
  repos: any[];
  username: string;
}

const RepoTable: React.FC<RepoTableProps> = ({ repos, username }) => {
  const [auditResults, setAuditResults] = useState<Record<string, any>>({});
  const [loadingRepos, setLoadingRepos] = useState<Set<string>>(new Set());

  const verifyRepo = async (repoName: string) => {
    setLoadingRepos(prev => new Set(prev).add(repoName));
    
    try {
      const res = await axios.post('http://localhost:3000/api/repo/analyze', {
        username,
        repoName
      });
      setAuditResults(prev => ({ ...prev, [repoName]: res.data }));
    } catch (error) {
      console.error("Verification failed", error);
      alert(`Failed to verify ${repoName}`);
    } finally {
      setLoadingRepos(prev => {
        const next = new Set(prev);
        next.delete(repoName);
        return next;
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repos.map((repo) => {
        const result = auditResults[repo.name];
        const isLoading = loadingRepos.has(repo.name);

        return (
          <div key={repo.name} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 flex flex-col justify-between h-full hover:border-gray-600 transition-all shadow-lg hover:shadow-xl">
            
            {/* HEADER */}
            <div className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-white truncate pr-2" title={repo.name}>
                  {repo.name}
                </h3>
                {repo.language && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-700 text-gray-300 px-2 py-1 rounded-full flex-shrink-0">
                    {repo.language}
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-sm line-clamp-2 h-10">
                {repo.description || "No description provided."}
              </p>
            </div>

            {/* STATS */}
            <div className="flex items-center gap-4 text-gray-500 text-xs font-medium mb-6">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                {repo.stargazers_count}
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 0C2.686 0 0 2.686 0 6c0 3.314 2.686 6 6 6 0-2.21 1.79-4 4-4v2c-1.105 0-2 .895-2 2 0 1.105.895 2 2 2v6h4v-6c1.105 0 2-.895 2-2 0-1.105-.895-2-2-2V6c2.21 0 4 1.79 4 4 3.314 0 6-2.686 6-6 0-3.314-2.686-6-6-6-3.314 0-6 2.686-6 6 0 2.21 1.79 4 4 4V2c-1.105 0-2-.895-2-2 0-1.105-.895-2-2-2V0H6z"/></svg>
                {repo.forks_count}
              </div>
              <div className="flex-1 text-right text-gray-600">
                {new Date(repo.updated_at).toLocaleDateString()}
              </div>
            </div>

            {/* FOOTER ACTION */}
            <div className="pt-4 border-t border-gray-700/50">
              {isLoading ? (
                <div className="flex items-center justify-center gap-2 text-blue-400 py-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-bold">Auditing...</span>
                </div>
              ) : result ? (
                <div className="animate-fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-black uppercase tracking-widest px-2 py-1 rounded ${
                      result.tier === 'Flagship' ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50' :
                      result.tier === 'Solid' ? 'bg-blue-900/50 text-blue-300 border border-blue-700/50' :
                      'bg-gray-700 text-gray-400'
                    }`}>
                      {result.tier}
                    </span>
                    <span className={`text-xl font-black ${
                      result.score >= 90 ? 'text-green-400' :
                      result.score >= 70 ? 'text-blue-400' :
                      'text-gray-500'
                    }`}>
                      {result.score}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {result.explanation}
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => verifyRepo(repo.name)}
                  className="w-full group relative flex items-center justify-center gap-2 bg-gray-700 hover:bg-blue-600 text-white py-2 rounded-lg font-bold text-sm transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    Deep Audit
                  </span>
                </button>
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
};

export default RepoTable;
