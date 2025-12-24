# 🧠 GitHub Profile Auditor (AI-Assisted)

> **An opinionated, career-aware GitHub audit tool that separates signal from noise — using deterministic scoring with AI-backed explanations.**

---

## 🚨 Problem

Most GitHub profiles don’t fail because developers lack skill — they fail because their **signal is buried**.

Common issues:
- Beginner or tutorial repos mixed with serious projects  
- Hackathon demos presented as production work  
- Forks and course repos cluttering the profile  
- No clarity on what should be kept, archived, or hidden  

Recruiters don’t investigate deeply.  
They skim, judge, and move on.

**This tool helps you curate your GitHub profile deliberately, not guess blindly.**

---

## 🎯 What this tool does

Given a **GitHub username**, the application:

1. Fetches all public repositories using the GitHub API  
2. Evaluates each repository using **rule-based scoring**
3. Uses **Gemini AI** to explain *why* a repository helps or hurts
4. Assigns clear verdicts:
   - ✅ **KEEP PUBLIC**
   - 🗃️ **ARCHIVE**
   - 🔒 **MAKE PRIVATE** (recommendation only)
5. Computes an overall **GitHub Profile Score**
6. Generates a **profile-level audit** with actionable recommendations

⚠️ The tool **never modifies GitHub**.  
It only analyzes, scores, and recommends.  
The user remains fully in control.

---

## 📊 GitHub Profile Score

After evaluating all repositories, the tool assigns a **profile score (0–100)**.

### Repo-level factors
- Technical depth  
- Recency & maintenance  
- README quality  
- Deployment presence  
- Real-world usefulness  
- Collaboration signals  
- Noise (tutorials, forks, abandoned demos)

### Profile-level factors
- Signal-to-noise ratio  
- Consistency of tech stack  
- Presence of flagship projects  
- Relevance to target role  

> **Important:**  
> The score is **deterministic and rule-based**.  
> Gemini AI is used only to **explain and contextualize** the score — not generate it arbitrarily.

This keeps the score:
- consistent  
- comparable  
- trustworthy  

---

## 🧠 Core Design Philosophy

This is **not** “let AI judge my GitHub”.

It is a **hybrid audit system**:

GitHub Data
↓
Rule-Based Repo Scoring
↓
Profile Aggregation
↓
Gemini AI (explanations & critique)
↓
Human Decision

yaml
Copy code

Rules decide.  
AI explains.  
User controls.

---

## 👤 User Inputs

### Required
- **GitHub username**

### Optional (Career-Aware Mode)
These inputs adjust expectations, not outcomes:
- Target role (Frontend / Backend / Full-Stack)
- Experience level (Student / Fresher / Professional)
- Career goal (Internship / Job / OSS)
- Primary tech stack
- Time horizon (e.g. “applying in 3 months”)

No essays.  
No personality fields.  
No unnecessary friction.

---

## 🧠 What Gemini AI does (and does NOT)

### Gemini DOES
- Explain repository strengths & weaknesses  
- Identify recruiter red flags  
- Suggest concrete improvements  
- Justify verdicts clearly  
- Summarize overall profile readiness  

### Gemini DOES NOT
- Decide scores  
- Change repository visibility  
- Archive or delete repositories  
- Act without rule-based grounding  

---

## 🧪 Repo-Level Audit Output

For each repository:
- Purpose & tech stack  
- Activity & maintenance status  
- README quality  
- Deployment status  
- Rule-based score  
- Final verdict  
- Gemini explanation  
- “Recruiter one-liner”  

---

## 📈 Profile-Level Audit Output

- GitHub Profile Score (0–100)  
- Signal vs noise breakdown  
- Recommended pinned repositories  
- What to archive or hide next  
- Internship / entry-level readiness summary  

---

## 🧱 Tech Stack

### Frontend
- React  
- Tailwind CSS  

### Backend
- Node.js  
- GitHub REST API  
- Gemini API (server-side only)  

---

## 🗺️ Development Phases

### Phase 1 — MVP
- GitHub username input  
- Repository fetching  
- Rule-based repository scoring  
- Verdicts + profile score  

### Phase 2 — AI Layer
- Gemini explanations  
- Repository & profile summaries  

### Phase 3 — Career Context
- Optional inputs  
- Context-aware analysis  

No feature creep before Phase 1 is complete.

---

## 🎯 Target Users

- College students  
- Internship seekers  
- Early-career developers  
- Anyone cleaning their GitHub profile before applications  

---

## 🏁 Why this project matters

This project demonstrates:
- API integration  
- System design  
- Responsible AI usage  
- Product thinking  
- Career-focused engineering decisions  

This is **resume-worthy**, not a toy project.

---

## ⚠️ Final Note

The score is a **guidance metric**, not an absolute judgment.  
The goal is clarity, not validation.

Clean signal wins interviews.
