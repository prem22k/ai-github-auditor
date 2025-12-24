export interface GithubRepo {
  name: string;
  description: string | null;
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  pushed_at: string;
  has_pages: boolean;
  homepage: string | null;
  html_url: string;
  has_readme?: boolean; // Optional as it requires extra API calls
}
