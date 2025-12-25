# Deployment Guide

## 1. Backend (Render.com)

Render is a great choice for deploying Node.js applications.

1.  **Push your code to GitHub.**
2.  **Create a new Web Service on Render:**
    *   Connect your GitHub repository.
    *   **Root Directory:** `backend`
    *   **Build Command:** `npm install && npm run build`
    *   **Start Command:** `npm start`
    *   **Environment Variables:**
        *   `GROQ_API_KEY`: Your Groq API Key.
        *   `GITHUB_TOKEN`: Your GitHub Personal Access Token.
        *   `NODE_VERSION`: `20` (Recommended).
3.  **Deploy.**
4.  **Copy the URL** (e.g., `https://github-profile-audit-backend.onrender.com`).

## 2. Frontend (Vercel)

Vercel is optimized for Vite/React apps.

1.  **Create a new Project on Vercel:**
    *   Connect your GitHub repository.
    *   **Root Directory:** `frontend`
    *   **Framework Preset:** Vite
    *   **Build Command:** `npm run build` (Default)
    *   **Output Directory:** `dist` (Default)
    *   **Environment Variables:**
        *   `VITE_API_URL`: The URL of your deployed backend (e.g., `https://github-profile-audit-backend.onrender.com`).
            *   *Note: Do NOT include a trailing slash.*
2.  **Deploy.**
    *   *Note: A `vercel.json` file has been added to handle client-side routing (preventing 404s on refresh).*

## 3. Final Configuration

Once both are deployed:

1.  **Update Backend CORS (Optional but Recommended):**
    *   Currently, the backend allows all origins (`cors()`).
    *   For better security, update `backend/src/index.ts` to only allow your Vercel domain:
        ```typescript
        app.use(cors({
          origin: 'https://your-frontend.vercel.app'
        }));
        ```
    *   Redeploy the backend.

## Troubleshooting

*   **CORS Errors:** If you see CORS errors in the browser console, ensure your backend is running and accessible. Check the Network tab.
*   **404 Errors:** Ensure `VITE_API_URL` is correct and does not have a trailing slash.
