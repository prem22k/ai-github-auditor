import dotenv from 'dotenv';
dotenv.config();
import { GithubApiError } from './fetchRepos';

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

export const fetchReadme = async (username: string, repo: string): Promise<string> => {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${username}/${repo}/readme`,
      { headers: getAuthHeaders() }
    );

    if (response.status === 404) return '';
    if (!response.ok) {
      console.warn(`Failed to fetch README for ${username}/${repo}: ${response.status} ${response.statusText}`);
      return '';
    }

    const data = await response.json() as any;
    if (!data.content) return '';
    
    return Buffer.from(data.content, 'base64').toString('utf-8');
  } catch (error) {
    console.warn(`Error fetching README for ${username}/${repo}:`, error);
    return '';
  }
};

export const fetchFileTree = async (username: string, repo: string): Promise<string> => {
  try {
    // Using HEAD to get the default branch's tree
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${username}/${repo}/git/trees/HEAD?recursive=1`,
      { headers: getAuthHeaders() }
    );

    if (response.status === 404 || response.status === 409) return ''; // 409 is for empty repos
    if (!response.ok) {
      console.warn(`Failed to fetch tree for ${username}/${repo}: ${response.status} ${response.statusText}`);
      return '';
    }

    const data = await response.json() as any;
    
    if (!data.tree || !Array.isArray(data.tree)) return '';

    const files = data.tree
      .filter((item: any) => {
        const path = item.path;
        // Exclude node_modules and .git
        if (path.includes('node_modules') || path.includes('.git')) return false;
        
        // Limit depth to 2 levels (e.g., "src/index.ts" is depth 2)
        const depth = path.split('/').length;
        return depth <= 2;
      })
      .map((item: any) => item.path);

    return files.join('\n');
  } catch (error) {
    console.warn(`Error fetching file tree for ${username}/${repo}:`, error);
    return '';
  }
};

export const fetchRepoDetails = async (username: string, repo: string) => {
  try {
    const [readme, fileTree] = await Promise.all([
      fetchReadme(username, repo).catch(err => {
        console.warn(`Error fetching README for ${username}/${repo}:`, err);
        return '';
      }),
      fetchFileTree(username, repo).catch(err => {
        console.warn(`Error fetching file tree for ${username}/${repo}:`, err);
        return '';
      })
    ]);

    return { readme, fileTree };
  } catch (error) {
    console.error(`Critical error in fetchRepoDetails for ${username}/${repo}:`, error);
    return { readme: '', fileTree: '' };
  }
};
