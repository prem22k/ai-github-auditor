# Security Policy

## Supported Versions

We currently only support the latest version of the code on the `main` branch.

| Version | Supported          |
| ------- | ------------------ |
| main    | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please do **not** create a public GitHub issue.

Instead, please send an email to **premsai224k@gmail.com**. All security vulnerability reports will be reviewed as soon as possible.

## AI & LLM Security

This tool uses Large Language Models (LLMs) like Llama 3.3 (via Groq) to analyze code.

### Prompt Injection
While we attempt to sanitize inputs (repository names, file contents, etc.) before sending them to the AI provider, users should be aware that:
*   **Prompt Injection is a known risk.** Maliciously crafted READMEs or file contents in a target repository could theoretically influence the AI's output.
*   **Unpredictable Outputs:** The AI's analysis is probabilistic. We do not guarantee that the output is free from hallucinations or bias.

## Data Privacy & Scope

*   **Public Data Only:** This tool is designed to audit **public** GitHub repositories.
*   **Token Handling:** If you run this tool locally, your `GITHUB_TOKEN` is used only to authenticate requests to the GitHub API to increase rate limits. It is **never** sent to our servers or any third party (other than GitHub itself).
*   **No Storage:** We do not store your code or your personal access tokens.
