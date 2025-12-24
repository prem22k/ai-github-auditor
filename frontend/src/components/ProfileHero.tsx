import React from 'react';

interface ProfileHeroProps {
  profileData: any;
}

const ProfileHero: React.FC<ProfileHeroProps> = ({ profileData }) => {
  const { user, audit } = profileData;
  const score = audit.score;
  const nickname = audit.nickname || "The Code Artisan"; // Fallback if not yet generated

  // Circular Progress Logic
  // We use a fixed radius for the SVG calculation, but scale it with CSS
  const radius = 50; 
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  // Color based on score
  const scoreColor = score >= 90 ? 'text-green-400' : score >= 70 ? 'text-blue-400' : 'text-yellow-400';
  const strokeColor = score >= 90 ? '#4ade80' : score >= 70 ? '#60a5fa' : '#facc15';

  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-black text-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-800 overflow-hidden mb-8">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-500/5 blur-3xl -z-10 pointer-events-none"></div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto">
        
        {/* LEFT: Avatar & Identity */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 flex-1">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src={user.avatar_url} 
              alt={user.login} 
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gray-900 object-cover shadow-2xl"
            />
          </div>
          
          <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2">
              {user.name || user.login}
            </h1>
            <div className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
              {nickname}
            </div>
            <p className="text-gray-400 mt-3 max-w-lg text-sm md:text-base leading-relaxed">
              {audit.headline}
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-6 mt-2 text-sm font-medium text-gray-300 bg-gray-800/40 px-6 py-3 rounded-full border border-gray-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              <span>{user.followers} Followers</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              <span>{user.public_repos} Repos</span>
            </div>
            {user.location && (
              <>
                <div className="hidden md:block w-px h-4 bg-gray-700"></div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span>{user.location}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT: Score Indicator */}
        <div className="relative flex items-center justify-center flex-shrink-0">
            {/* SVG Circle */}
            <div className="relative w-48 h-48 md:w-64 md:h-64">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    {/* Background Circle */}
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-800"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        stroke={strokeColor}
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-5xl md:text-6xl font-black ${scoreColor}`}>
                        {score}
                    </span>
                    <span className="text-gray-500 text-[10px] md:text-xs uppercase tracking-widest font-bold mt-1">
                        Profile Score
                    </span>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileHero;
