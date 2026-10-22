import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TRY_PROFILES = ['prem22k', 'torvalds', 'sindresorhus'];

const FEATURES = [
  {
    title: 'Profile score',
    description: 'Signal from your activity, stars, and docs — distilled into one honest number.',
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" d="M4.5 17a8.5 8.5 0 1 1 15 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m12 14 4-4" />
        <circle cx="12" cy="14" r="1.5" fill="currentColor" stroke="none" />
        <path strokeLinecap="round" d="M5.4 12.2h1.4M12 4.8v1.4M18.6 12.2h-1.4" />
      </svg>
    ),
  },
  {
    title: 'Repository tiers',
    description: 'See which repos are portfolio-grade — and which ones are just noise.',
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m3 12 9 5 9-5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m3 16 9 5 9-5" />
      </svg>
    ),
  },
  {
    title: 'Recruiter impression',
    description: 'An AI summary of how a hiring manager actually reads your profile.',
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 11.5a8.4 8.4 0 0 1-8.5 8.3H8l-4 2.7v-5.2a8.1 8.1 0 0 1-1-4.1A8.4 8.4 0 0 1 11.5 3h1A8.4 8.4 0 0 1 21 11.5Z"
        />
        <path strokeLinecap="round" strokeWidth="2.4" d="M8.2 11h.01M12 11h.01M15.8 11h.01" />
      </svg>
    ),
  },
];

const Home: React.FC = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      navigate(`/audit/${username}`);
    }
  };

  const handleTryProfile = (handle: string) => {
    setUsername(handle);
    navigate(`/audit/${handle}`);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      </div>

      <main className="relative z-10 flex flex-1 flex-col justify-center">
        {/* Hero */}
        <section className="mx-auto w-full max-w-3xl px-4 pb-10 pt-16 text-center sm:px-6 sm:pt-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/70 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-300 shadow-lg shadow-black/20 backdrop-blur sm:text-[11px]">
            <span className="h-1.5 w-1.5 flex-none rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.9)]" />
            Career-aware GitHub audit
          </span>

          <h1 className="mt-7 text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
            GitHub Profile{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Auditor
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            An opinionated, career-aware GitHub audit tool that separates signal from noise.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto mt-8 w-full max-w-xl">
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="github-username" className="sr-only">
                GitHub username
              </label>
              <input
                id="github-username"
                type="text"
                required
                autoComplete="off"
                spellCheck={false}
                className="w-full min-w-0 flex-1 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3.5 text-sm text-white shadow-lg shadow-black/20 outline-none transition placeholder:text-slate-400 focus:border-indigo-500/70 focus:ring-2 focus:ring-indigo-500/20 sm:text-base"
                placeholder="Enter GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                type="submit"
                className="w-full flex-none cursor-pointer rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/50 transition hover:from-indigo-500 hover:to-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 active:scale-[0.99] sm:w-auto"
              >
                Audit Profile
              </button>
            </div>
          </form>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="font-medium text-slate-500">Try:</span>
            {TRY_PROFILES.map((handle) => (
              <button
                key={handle}
                type="button"
                onClick={() => handleTryProfile(handle)}
                className="cursor-pointer rounded-full border border-slate-800 bg-slate-900/60 px-3.5 py-1.5 font-mono text-[11px] text-slate-300 transition hover:border-indigo-500/50 hover:bg-slate-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                {handle}
              </button>
            ))}
          </div>
        </section>

        {/* What you get */}
        <section className="mx-auto w-full max-w-5xl px-4 pb-14 pt-6 sm:px-6 sm:pb-20 sm:pt-10">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-transparent to-slate-700" />
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              What you get
            </h2>
            <span aria-hidden="true" className="h-px w-8 bg-gradient-to-l from-transparent to-slate-700" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {FEATURES.map((feature) => (
              <article
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 text-left shadow-lg shadow-black/20 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-indigo-500/40 hover:bg-slate-900/80"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/0 to-transparent transition duration-300 group-hover:via-indigo-400/60"
                />
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 transition group-hover:border-indigo-400/40 group-hover:text-indigo-200">
                  {feature.icon}
                </div>
                <h3 className="text-sm font-semibold text-white">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-slate-900">
        <div className="mx-auto flex w-full max-w-5xl justify-center px-4 py-6 sm:px-6">
          <a
            href="https://github.com/prem22k/ai-github-auditor"
            target="_blank"
            rel="noreferrer"
            className="text-center text-xs text-slate-500 transition hover:text-slate-300"
          >
            Built by Prem Sai Kota <span className="text-slate-700">·</span> Open source on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
