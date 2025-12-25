import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RepoTable from '../components/RepoTable';
import ProfileHero from '../components/ProfileHero';
import ProfileAnalysis from '../components/ProfileAnalysis';
import { API_BASE_URL } from '../config';

const Audit = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [showColdStart, setShowColdStart] = useState(false);

  useEffect(() => {
    if (!username) return;
    
    // 🕒 Timer: If loading takes > 3 seconds, show the "Waking Up" message
    const coldStartTimer = setTimeout(() => {
      setShowColdStart(true);
    }, 3000);
    
    // 1. Fetch Profile Data (Score, Nickname, Analysis)
    axios.get(`${API_BASE_URL}/api/profile/${username}`)
      .then(res => {
        setProfileData(res.data);
        setLoadingProfile(false);
        clearTimeout(coldStartTimer);
        setShowColdStart(false);
      })
      .catch(err => {
        console.error("Profile fetch error:", err);
        setLoadingProfile(false);
        clearTimeout(coldStartTimer);
        setShowColdStart(false);
      });

    // 2. Fetch Repo List (Raw list for evidence)
    axios.get(`${API_BASE_URL}/api/audit/${username}`)
      .then(res => {
        setRepos(res.data.repos);
        setLoadingRepos(false);
      })
      .catch(err => {
        console.error("Repo fetch error:", err);
        setLoadingRepos(false);
      });

    return () => clearTimeout(coldStartTimer);
  }, [username]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HERO SECTION */}
        {loadingProfile ? (
          <div className="bg-gray-800/50 p-12 rounded-3xl border border-gray-800 animate-pulse h-80 flex items-center justify-center">
             <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <div className="text-gray-500 font-mono text-sm">Analyzing Profile Brand...</div>
                
                {/* ❄️ THE COLD START MESSAGE */}
                {showColdStart && (
                  <div className="bg-yellow-900/30 border border-yellow-600/50 p-4 rounded-lg max-w-md mx-auto mt-4 animate-fade-in">
                    <p className="text-yellow-400 font-bold text-sm">⚠️ Server Waking Up</p>
                    <p className="text-gray-300 text-xs mt-1">
                      Since we are on the free tier, the forensic engine is spinning up. 
                      This may take up to 60 seconds. Please hold on!
                    </p>
                  </div>
                )}
             </div>
          </div>
        ) : profileData ? (
          <ProfileHero profileData={profileData} />
        ) : (
          <div className="text-red-400 p-10 text-center border border-red-900 rounded-xl bg-red-900/10">
            Profile Analysis Failed.
          </div>
        )}

        {/* DETAILED ANALYSIS GRID */}
        {loadingProfile ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/30 h-64 rounded-xl animate-pulse border border-gray-800"></div>
            <div className="bg-gray-800/30 h-64 rounded-xl animate-pulse border border-gray-800"></div>
          </div>
        ) : profileData && profileData.audit ? (
          <ProfileAnalysis audit={profileData.audit} />
        ) : null}

        {/* REPOSITORY EVIDENCE */}
        <div className="p-8 bg-gray-900/50 rounded-3xl border border-gray-800/50">
          <h2 className="text-2xl font-bold text-gray-300 flex items-center gap-2 mb-6">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
            Repository Evidence
          </h2>
          
          {loadingRepos ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-gray-800/30 h-48 rounded-xl animate-pulse border border-gray-800"></div>
              ))}
            </div>
          ) : repos.length > 0 ? (
            <RepoTable repos={repos} username={username || ''} />
          ) : (
            <div className="text-gray-500 text-center py-10">No public repositories found.</div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Audit;
