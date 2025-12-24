import Groq from "groq-sdk";
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const PROFILE_SYSTEM_PROMPT = `
You are a Senior Technical Recruiter. You are auditing a candidate's GitHub Profile "First Impression".

INPUT:
- User Bio, Company, Location, Blog
- Public Repo Count, Followers
- Profile README (The special repository username/username)

GOAL:
Determine if this developer looks "Job Ready" based purely on presentation.

SCORING CRITERIA (0-100):
- **Professionalism (25%)**: Has a clear bio, real name, location, and links?
- **Brand (25%)**: Does the Profile README explain WHO they are and WHAT they do?
- **Activity (25%)**: Do they have public repos and followers?
- **Clarity (25%)**: Can you tell their tech stack in < 5 seconds?

OUTPUT JSON (Strictly valid JSON, no markdown):
{
  "score": number,
  "nickname": string, // Generate a creative 'RPG-style' Class based on their work (e.g. "The Full-Stack Catalyst", "The Deployment Warlord")
  "headline": string, // "Top-Tier Full Stack Student" or "Ghost Profile"
  "summary": string, // 2 sentences on recruiter impression
  "strengths": string[],
  "missing_elements": string[] // e.g. "Missing LinkedIn link", "Bio is empty"
}
`;

export async function auditProfileWithGroq(userMetadata: any, profileReadme: string) {
  const userMessage = `
  USER METADATA:
  Name: ${userMetadata.name}
  Bio: ${userMetadata.bio || "No Bio"}
  Company: ${userMetadata.company || "No Company"}
  Blog/Portfolio: ${userMetadata.blog || "No Link"}
  Public Repos: ${userMetadata.public_repos}
  Followers: ${userMetadata.followers}

  PROFILE README CONTENT:
  ${profileReadme ? profileReadme.substring(0, 5000) : "No Profile README found."}
  `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: PROFILE_SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      response_format: { type: "json_object" },
    });

    const content = chatCompletion.choices[0]?.message?.content || "{}";
    return JSON.parse(content);

  } catch (error: any) {
    console.error("Profile Audit Failed:", error.message);
    return {
      score: 50,
      nickname: "The Unranked",
      headline: "Profile Analysis Unavailable",
      summary: "AI Service is currently overloaded. Please try again later.",
      strengths: [],
      missing_elements: []
    };
  }
}
