import dotenv from 'dotenv';
dotenv.config();
import { GithubRepo } from '../types/repo';

const GITHUB_API_BASE = 'https://api.github.com';

const getAuthHeaders = () => {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'github-profile-audit-bot'
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
};

export class GithubApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'GithubApiError';
  }
}

export const fetchUserRepositories = async (username: string): Promise<GithubRepo[]> => {
  const repos: GithubRepo[] = [];
  let page = 1;
  const perPage = 100;
  let hasMore = true;

  try {
    while (hasMore) {
      const response = await fetch(
        `${GITHUB_API_BASE}/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated`,
        {
          headers: getAuthHeaders()
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new GithubApiError(404, `User '${username}' not found`);
        }
        if (response.status === 403) {
          throw new GithubApiError(403, 'GitHub API rate limit exceeded');
        }
        throw new GithubApiError(response.status, `GitHub API error: ${response.statusText}`);
      }

      const data = await response.json() as any[];

      if (data.length === 0) {
        hasMore = false;
      } else {
        const mappedRepos = data.map((repo: any) => ({
          name: repo.name,
          description: repo.description,
          fork: repo.fork,
          archived: repo.archived,
          stargazers_count: repo.stargazers_count,
          language: repo.language,
          updated_at: repo.updated_at,
          pushed_at: repo.pushed_at,
          has_pages: repo.has_pages,
          homepage: repo.homepage,
          html_url: repo.html_url
        }));

        repos.push(...mappedRepos);

        if (data.length < perPage) {
          hasMore = false;
        } else {
          page++;
        }
      }
    }

    return repos;
  } catch (error) {
    if (error instanceof GithubApiError) {
      throw error;
    }
    console.error('Error fetching repositories:', error);
    throw new Error('Failed to fetch repositories');
  }
};
