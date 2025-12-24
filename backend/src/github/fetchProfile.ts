import dotenv from 'dotenv';

dotenv.config();

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

export const fetchUserProfile = async (username: string) => {
  try {
    // 1. Get Basic User Data
    const userRes = await fetch(`https://api.github.com/users/${username}`, { headers: getAuthHeaders() });
    
    if (!userRes.ok) {
       throw new Error(`GitHub API Error: ${userRes.statusText}`);
    }
    
    const userData = await userRes.json();
    
    // 2. Get Profile README (raw content)
    let profileReadme = "";
    try {
      const readmeRes = await fetch(
        `https://raw.githubusercontent.com/${username}/${username}/main/README.md`, 
        { headers: getAuthHeaders() } // Try main branch
      );
      
      if (readmeRes.ok) {
        profileReadme = await readmeRes.text();
      } else {
         // Try master branch
        const readmeResMaster = await fetch(
            `https://raw.githubusercontent.com/${username}/${username}/master/README.md`, 
            { headers: getAuthHeaders() } 
        );
        if (readmeResMaster.ok) {
            profileReadme = await readmeResMaster.text();
        }
      }
    } catch (e) {
        // No profile README found, that's fine
        console.log("No special profile README found.");
    }

    // 3. Get Repositories (Top 6 recently updated)
    let repos = [];
    try {
        const reposRes = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
            { headers: getAuthHeaders() }
        );
        if (reposRes.ok) {
            repos = await reposRes.json();
        }
    } catch (e) {
        console.log("Error fetching repos list", e);
    }

    return {
      metadata: userData,
      readme: profileReadme,
      repos: repos
    };

  } catch (error: any) {
    console.error("Error fetching user profile:", error.message);
    throw new Error("User not found or GitHub API error");
  }
};
