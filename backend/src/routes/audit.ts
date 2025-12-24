import { Router, Request, Response } from 'express';
import { fetchUserRepositories, GithubApiError } from '../github/fetchRepos';

const router = Router();

router.get('/:username', async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const repos = await fetchUserRepositories(username);
    res.json({
      username,
      repos
    });
  } catch (error) {
    if (error instanceof GithubApiError) {
      res.status(error.status).json({ error: error.message });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

export default router;
