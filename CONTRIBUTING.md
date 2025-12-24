# Contributing to GitHub Profile Auditor

## Philosophy: High Signal, Low Noise

This project exists to separate engineering signal from noise. We apply the same standard to our codebase as we do to the profiles we audit.

**We value:**
*   **Strictness:** The AI auditor is designed to be cynical. PRs that "soften" the grading or introduce bias will be rejected.
*   **Performance:** No unnecessary dependencies.
*   **Clarity:** Code must be self-documenting.

**We reject:**
*   Feature bloat.
*   Relaxing the "Strict Mode" scoring logic without strong justification.
*   Low-effort contributions (see below).

## Getting Started

The project is a monorepo with a Node.js/Express backend and a React/Vite frontend.

### Prerequisites
*   Node.js (v18+)
*   npm
*   A Groq API Key (for AI features)

### Local Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/github-profile-audit.git
    cd github-profile-audit
    ```

2.  **Setup Backend:**
    ```bash
    cd backend
    npm install
    # Create a .env file with GROQ_API_KEY and GITHUB_TOKEN
    npm run dev
    ```

3.  **Setup Frontend:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

## Pull Request Standards

We hold contributors to a high bar. Before submitting a PR, ensure:

1.  **Preserve Strictness:** If you touch the scoring logic (`backend/src/ai/repoAuditor.ts`), you **MUST** verify that it still correctly identifies "Noise" vs "Flagship" repos.
2.  **Documentation:** If you add a feature, update the `README.md`.
3.  **Quality over Speed:** We apply the "One-Day Build" penalty to PRs too. Do not rush code. Test it thoroughly.
4.  **Atomic Commits:** Keep changes focused.

## Style Guide

*   **TypeScript Strict Mode:** Enabled.
*   **No `any`:** Explicitly define interfaces and types. `any` is banned unless absolutely necessary (and commented).
*   **Functional Components:** Use React Functional Components with Hooks.

## 🚫 A Note on "Hacktoberfest" & Low-Effort PRs

We do **not** accept:
*   Typo fixes in documentation (unless part of a larger update).
*   Formatting changes (use the linter).
*   "Hello World" scripts.

PRs that appear to be "farming" contributions will be closed and marked as spam immediately.

---

**"Show me the code, or show me the door."**
