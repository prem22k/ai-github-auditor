import { GithubRepo } from '../types/repo';

export type RepoTier = 'FLAGSHIP' | 'SUPPORTING' | 'NEUTRAL' | 'NOISE';

const SIX_MONTHS_MS = 6 * 30 * 24 * 60 * 60 * 1000;

export const classifyRepoTier = (repo: GithubRepo, score: number): RepoTier => {
  const isArchived = repo.archived;
  const isFork = repo.fork;
  const lastPush = new Date(repo.pushed_at).getTime();
  const isRecent = (Date.now() - lastPush) < SIX_MONTHS_MS;

  // NOISE Check
  // - archived
  // - score < 40
  // - forked with low activity
  if (isArchived || score < 40 || (isFork && !isRecent)) {
    return 'NOISE';
  }

  // FLAGSHIP Check
  // at least 3 of these are true:
  // - has deployment (homepage or has_pages)
  // - not forked OR forked with score >= 80
  // - updated in last 6 months
  // - score >= 75
  // - not single HTML/CSS only
  const hasDeployment = !!(repo.homepage || repo.has_pages);
  const forkCondition = !isFork || (isFork && score >= 80);
  const notSingleHtmlCss = repo.language !== 'HTML' && repo.language !== 'CSS';

  let flagshipSignals = 0;
  if (hasDeployment) flagshipSignals++;
  if (forkCondition) flagshipSignals++;
  if (isRecent) flagshipSignals++;
  if (score >= 75) flagshipSignals++;
  if (notSingleHtmlCss) flagshipSignals++;

  if (flagshipSignals >= 3) {
    return 'FLAGSHIP';
  }

  // SUPPORTING Check
  // - score >= 60
  // - not archived (already checked in NOISE)
  if (score >= 60) {
    return 'SUPPORTING';
  }

  // NEUTRAL Check
  // - score between 40 and 59
  // (Implicitly true here since score < 40 is handled in NOISE)
  return 'NEUTRAL';
};
