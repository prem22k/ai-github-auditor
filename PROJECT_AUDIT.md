# PROJECT_AUDIT.md

## The One-Liner
A high-performance, opinionated GitHub auditing tool that combines deterministic forensic heuristics with Llama 3.3 (via Groq) to simulate a cynical engineering manager's deep-dive review.

## The 'Technical Hook' (Crucial)
**The 'Cynical Manager' Hybrid Audit Logic** (`backend/src/ai/repoAuditor.ts`)

Instead of relying solely on LLMs which can be charmed by polished READMEs, this project implements a "Forensic" layer *before* the AI call. The `auditRepoWithGroq` function calculates hard metrics like "Dev Duration" (time between creation and last push). If a repo was built in < 24 hours (a "One-Day Build"), it forces a `isOneDayRepo` negative signal into the prompt, instructing the AI to cap the score regardless of the code quality. This prevents "Tutorial Hell" projects from scoring high.

## The True Stack (Evidence-Based)
*   **Frontend Reference:** `frontend/package.json`
    *   **Core:** React, Vite
    *   **Styling:** Tailwind CSS, Autoprefixer, PostCSS
    *   **Routing:** React Router Dom
    *   **Network:** Axios
*   **Backend Reference:** `backend/package.json`
    *   **Runtime:** Node.js, Express
    *   **AI:** Groq SDK (`groq-sdk`)
    *   **Utilities:** Dotenv, Cors
    *   **Dev:** TypeScript, Nodemon

## Architecture & Scale Indicators
*   **Database:** **None.** The app performs real-time aggregation from the GitHub REST API and analyzes data on the fly without persistence.
*   **Authentication:** **None.** The application audits public GitHub profiles and does not require user sign-up or login.
*   **Deployment:**
    *   **Frontend:** Vercel (indicated by `frontend/vercel.json` and `DEPLOYMENT_GUIDE.md`).
    *   **Backend:** Render (suggested in `DEPLOYMENT_GUIDE.md` which includes environment setup for `groq-sdk` and `github-token`).

## Product Features
1.  **"First Impression" Profile Audit:** Simulates a recruiter's 5-second scan of a user's bio, followers, and "Profile README" to generate an RPG-style nickname and score.
2.  **"Lethal Mode" Repo Deep Dive:** A strict, evidence-based analysis of individual repositories that classifies them into tiers (FLAGSHIP, SOLID, NEUTRAL, NOISE) based on file structure and code depth.
3.  **Deterministic Anti-Gamification:** Uses calculated heuristics (e.g., Boilerplate %, Dev Duration) to downgrade scores for low-effort or "rush job" repositories, preventing AI hallucinations.
