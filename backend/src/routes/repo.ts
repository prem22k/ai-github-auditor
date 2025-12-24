import { Router, Request, Response } from 'express';
import { fetchRepoDetails } from '../github/fetchDetails';
import { fetchUserRepositories } from '../github/fetchRepos';
import { auditRepoWithGroq } from '../ai/repoAuditor';

const router = Router();

router.post('/analyze', async (req: Request, res: Response) => {
  const { username, repoName } = req.body;

  if (!username || !repoName) {
    return res.status(400).json({ error: 'Username and repoName are required' });
  }

  try {
    // 1. Fetch all user repos to find the specific one's metadata
    // Note: Ideally we would fetch just one repo, but reusing existing logic for now.
    // Optimization: Could create a fetchSingleRepo function later.
    const allRepos = await fetchUserRepositories(username);
    const repoMetadata = allRepos.find((r: any) => r.name === repoName);

    if (!repoMetadata) {
      return res.status(404).json({ error: `Repository '${repoName}' not found for user '${username}'` });
    }

    // 2. Fetch Details (README + File Tree)
    const { readme, fileTree } = await fetchRepoDetails(username, repoName);

    // 3. Audit with Groq
    const auditResult = await auditRepoWithGroq(username, repoMetadata, readme, fileTree);

    if (!auditResult) {
      return res.status(500).json({ error: 'AI Audit failed to generate a result.' });
    }

    res.json(auditResult);

  } catch (error: any) {
    console.error('Repo Audit Error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

export default router;
