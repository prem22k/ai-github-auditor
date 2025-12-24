import React from 'react';

interface ProfileAnalysisProps {
  audit: {
    strengths: string[];
    missing_elements: string[];
    summary: string;
    headline: string;
  };
}

const ProfileAnalysis: React.FC<ProfileAnalysisProps> = ({ audit }) => {
  return (
    <div className="space-y-6">
      {/* Two Column Grid for Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Strengths Column */}
        <div className="bg-gray-800/50 p-6 rounded-xl border border-green-900/30 shadow-lg backdrop-blur-sm">
          <h3 className="text-green-400 font-bold text-lg mb-4 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Strengths
          </h3>
          <ul className="space-y-3">
            {audit.strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300 text-sm">
                <span className="mt-1 w-5 h-5 flex items-center justify-center bg-green-500/20 rounded-full flex-shrink-0">
                  <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span className="leading-relaxed">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement Column */}
        <div className="bg-gray-800/50 p-6 rounded-xl border border-yellow-900/30 shadow-lg backdrop-blur-sm">
          <h3 className="text-yellow-400 font-bold text-lg mb-4 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            Areas for Improvement
          </h3>
          <ul className="space-y-3">
            {audit.missing_elements.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300 text-sm">
                <span className="mt-1 w-5 h-5 flex items-center justify-center bg-yellow-500/20 rounded-full flex-shrink-0">
                  <svg className="w-3 h-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recruiter Impression Box */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 relative mt-8">
        <div className="absolute -top-4 left-6 bg-gray-900 px-3 py-1 rounded-full border border-gray-700 text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9.01703C7.91246 16 7.01703 16.8954 7.01703 18V21H14.017ZM21.017 21L21.017 18C21.017 16.8954 20.1216 16 19.017 16H16.017C14.9125 16 14.017 16.8954 14.017 18V21H21.017ZM24.017 12C24.017 5.37258 18.6444 0 12.017 0C5.38961 0 0.0170288 5.37258 0.0170288 12C0.0170288 18.6274 5.38961 24 12.017 24C18.6444 24 24.017 18.6274 24.017 12ZM12.017 22C6.49419 22 2.01703 17.5228 2.01703 12C2.01703 6.47715 6.49419 2 12.017 2C17.5399 2 22.017 6.47715 22.017 12C22.017 17.5228 17.5399 22 12.017 22Z" />
          </svg>
          Recruiter Impression
        </div>
        <div className="flex gap-4 pt-2">
          <svg className="w-8 h-8 text-gray-600 flex-shrink-0 transform rotate-180" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9.01703C7.91246 16 7.01703 16.8954 7.01703 18V21H14.017ZM21.017 21L21.017 18C21.017 16.8954 20.1216 16 19.017 16H16.017C14.9125 16 14.017 16.8954 14.017 18V21H21.017ZM24.017 12C24.017 5.37258 18.6444 0 12.017 0C5.38961 0 0.0170288 5.37258 0.0170288 12C0.0170288 18.6274 5.38961 24 12.017 24C18.6444 24 24.017 18.6274 24.017 12ZM12.017 22C6.49419 22 2.01703 17.5228 2.01703 12C2.01703 6.47715 6.49419 2 12.017 2C17.5399 2 22.017 6.47715 22.017 12C22.017 17.5228 17.5399 22 12.017 22Z" />
          </svg>
          <div className="space-y-2">
            <p className="text-gray-300 italic text-lg leading-relaxed">
              "{audit.summary}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAnalysis;
