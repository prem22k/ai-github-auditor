import { GithubRepo } from '../types/repo';
import { classifyRepoTier, RepoTier } from './repoTier';

export interface ScoredRepo {
  repo: GithubRepo;
  score: number;
}

export interface ProfileScoreResult {
  profileScore: number;
  flagshipRepos: ScoredRepo[];
  noiseRepos: ScoredRepo[];
  tierBreakdown: Record<RepoTier, number>;
}

export const calculateProfileScore = (scoredRepos: ScoredRepo[]): ProfileScoreResult => {
  const tierBuckets: Record<RepoTier, ScoredRepo[]> = {
    FLAGSHIP: [],
    SUPPORTING: [],
    NEUTRAL: [],
    NOISE: [],
  };

  // 1. Classify all repos
  scoredRepos.forEach((item) => {
    const tier = classifyRepoTier(item.repo, item.score);
    tierBuckets[tier].push(item);
  });

  // 2. Calculate Weighted Sum
  // Weights:
  // - FLAGSHIP: 3.0 (limit to top 4 repos)
  // - SUPPORTING: 1.5
  // - NEUTRAL: 0.5
  // - NOISE: -1.0

  const flagshipCount = tierBuckets.FLAGSHIP.length;
  const effectiveFlagships = Math.min(flagshipCount, 4);
  const overflowFlagships = Math.max(0, flagshipCount - 4);

  const weightedSum =
    effectiveFlagships * 3.0 +
    overflowFlagships * 1.5 + // Treat overflow flagships as Supporting
    tierBuckets.SUPPORTING.length * 1.5 +
    tierBuckets.NEUTRAL.length * 0.5 +
    tierBuckets.NOISE.length * -1.0;

  // 3. Calculate Max Possible Score
  // Max possible is if the user had the same number of repos, but they were all "perfect".
  // Perfect means: Top 4 are Flagship (3.0), rest are Supporting (1.5).
  const totalRepos = scoredRepos.length;
  const maxEffective = Math.min(totalRepos, 4);
  const maxOverflow = Math.max(0, totalRepos - 4);
  
  const maxPossible = (maxEffective * 3.0) + (maxOverflow * 1.5);

  // 4. Compute Final Score
  let profileScore = 0;
  if (maxPossible > 0) {
    profileScore = (weightedSum / maxPossible) * 100;
  }

  // Clamp between 0 and 100
  profileScore = Math.max(0, Math.min(100, Math.round(profileScore)));

  return {
    profileScore,
    flagshipRepos: tierBuckets.FLAGSHIP,
    noiseRepos: tierBuckets.NOISE,
    tierBreakdown: {
      FLAGSHIP: tierBuckets.FLAGSHIP.length,
      SUPPORTING: tierBuckets.SUPPORTING.length,
      NEUTRAL: tierBuckets.NEUTRAL.length,
      NOISE: tierBuckets.NOISE.length,
    },
  };
};
