# 🕵️‍♂️ AI GitHub Auditor (Forensic Edition)

> **"Code that isn't documented doesn't exist."**

An opinionated, forensic audit tool that grades GitHub profiles and repositories for job-readiness. It separates **Signal from Noise** using strict engineering standards, detecting tutorial clones, low-effort forks, and "marketing fluff" that lacks code evidence.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-Lethal%20Mode-red)
![Stack](https://img.shields.io/badge/stack-React%20%7C%20Node.js%20%7C%20Llama%203.3-orange)

---

## 🚨 The Problem

Most GitHub profiles fail not because developers lack skill, but because **their best work is buried**.
Recruiters spend **<10 seconds** on a profile. If they see:
* ❌ 30+ "Tutorial" repos (e.g., `react-course-chapter-1`)
* ❌ Forks with zero commits
* ❌ "Full-Stack" apps with empty READMEs
* ❌ "AI Projects" that are just API wrappers

...they close the tab. **You lose the interview.**

---

## 🎯 What This Tool Does

This is not a "nice" AI. It acts as a **Cynical Senior Hiring Manager**.
It audits your profile in two stages:

### 1. The "First Impression" (Profile Audit)
Before looking at code, it judges your **Presentation**:
* Does your Bio & README clearly state your value?
* Do you have a professional avatar and links?
* **Verdict:** Assigns a `Profile Score` (0-100) and an RPG-style Class (e.g., *"The Full-Stack Catalyst"* or *"The Ghost Developer"*).

### 2. The "Forensic Deep Dive" (Repo Audit)
When you ask it to verify a specific repository, it performs a **Lethal Audit**:
* **Boilerplate Detection:** If >50% of your code is config/JSON, you get a penalty.
* **The "Ghost" Rule:** Great code with no README = **Max Score 75**.
* **One-Day Wonders:** If you built a "complex app" in <24 hours, it flags it as a "Rush Job" (Max Score 60).
* **Claim Verification:** If you claim "AI-Powered" but have no ML libraries, it flags a "Marketing Mismatch".

---

## 📊 The Scoring System (Strict Mode)

We use **Llama 3.3 (via Groq)** with a low temperature to ensure objective grading.

| Tier | Score | Definition |
| :--- | :--- | :--- |
| **🏆 FLAGSHIP** | **90-100** | Real-world app. Complex logic (Auth, State, CI/CD). **MUST have extensive documentation.** |
| **🛠️ SOLID** | **70-89** | Clean code that works. Caps at 80 if it's a generic "Buzzword Stack" (MERN CRUD) or lacks a README. |
| **😐 NEUTRAL** | **40-69** | Config files, simple scripts, "Profile READMEs", or repos with >50% boilerplate. |
| **🗑️ NOISE** | **0-39** | Forks, "Hello World" tests, empty folders, or obvious tutorial clones (`scrimba`, `bootcamp`). |

---

## 🧱 Tech Stack

* **Frontend:** React, Tailwind CSS (Dark Mode UI)
* **Backend:** Node.js, Express, TypeScript
* **AI Engine:** Groq SDK (Llama-3.3-70b-Versatile)
* **Data Source:** GitHub REST API

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+)
* A free [Groq API Key](https://console.groq.com)
* (Optional) GitHub Personal Access Token (for higher rate limits)

### Installation

1.  **Clone the repo**
    ```bash
    git clone [https://github.com/prem22k/ai-github-auditor.git](https://github.com/prem22k/ai-github-auditor.git)
    cd ai-github-auditor
    ```

2.  **Setup Backend**
    ```bash
    cd backend
    npm install
    # Create .env file
    echo "GROQ_API_KEY=your_key_here" > .env
    npm run dev
    ```

3.  **Setup Frontend**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

4.  **Audit Yourself**
    Open `http://localhost:5173` and enter your GitHub username.

---

## ⚠️ Disclaimer

This tool is **opinionated**. It mimics the harsh reality of tech hiring.
* It **will** hurt your feelings if your repos are empty.
* It **will** give you a low score if you pushed a repo 5 minutes ago (The "One-Day Build" penalty).

**The goal is not to validate you. The goal is to get you hired.**

---

### 👤 Author

**Prem Sai Kota**
* GitHub: [@prem22k](https://github.com/prem22k)
* LinkedIn: [Prem Sai Kota](https://linkedin.com/in/premsai22k)

_"Building tools that tell the truth."_