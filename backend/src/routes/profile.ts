import { Router } from 'express';
import { fetchUserProfile } from '../github/fetchProfile';
import { auditProfileWithGroq } from '../ai/profileAuditor';

const router = Router();

router.get('/:username', async (req, res) => {
  const { username } = req.params;

  try {
    console.log(`Fetching profile for ${username}...`);
    // 1. Get Data
    const { metadata, readme, repos } = await fetchUserProfile(username);

    // 2. Audit with Gemini (ONE CALL)
    const audit = await auditProfileWithGroq(metadata, readme);

    // 3. Return Combined Result
    res.json({
      user: metadata,
      audit: audit,
      repos: repos
    });
    
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
