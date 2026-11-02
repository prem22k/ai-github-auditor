import dotenv from "dotenv";

// Load env vars before reading them, so GROQ_MODEL from .env is honoured.
dotenv.config();

export const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
