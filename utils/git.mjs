import { execSync } from "node:child_process";

/**
 * Get GitHub repository URL
 * @returns {string} - GitHub repository URL or empty string
 */
export function getGithubRepoUrl() {
  try {
    const gitRemote = execSync("git remote get-url origin", {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "ignore"],
    }).trim();

    if (gitRemote.includes("github.com")) {
      return gitRemote;
    }

    return "";
  } catch {
    return "";
  }
}

/**
 * Get GitHub repository information
 * @param {string} repoUrl - The repository URL
 * @returns {Promise<Object>} - Repository information
 */
export async function getGitHubRepoInfo(repoUrl) {
  try {
    const match = repoUrl.match(/github\.com[/:]([^/]+)\/([^/]+?)(?:\.git)?$/);
    if (!match) return null;

    const [, owner, repo] = match;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.warn("Failed to fetch GitHub repository info:", repoUrl, response.statusText);
      return null;
    }

    const data = await response.json();
    return {
      name: data.name,
      description: data.description || "",
      icon: data.owner?.avatar_url || "",
    };
  } catch (error) {
    console.warn("Failed to fetch GitHub repository info:", error.message);
    return null;
  }
}
