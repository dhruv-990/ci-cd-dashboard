const axios = require('axios');
require('dotenv').config();

const { GITHUB_TOKEN } = process.env;

function extractRepoInfo(repoUrl) {
  // Handle different GitHub URL formats
  const patterns = [
    /github\.com\/([^\/]+)\/([^\/]+)/, // github.com/owner/repo
    /github\.com\/([^\/]+)\/([^\/]+)\.git/, // github.com/owner/repo.git
    /^([^\/]+)\/([^\/]+)$/ // owner/repo
  ];

  for (const pattern of patterns) {
    const match = repoUrl.match(pattern);
    if (match) {
      return {
        owner: match[1],
        repo: match[2].replace('.git', '')
      };
    }
  }
  
  throw new Error('Invalid GitHub repository URL. Please use format: github.com/owner/repo or owner/repo');
}

async function fetchWorkflowRuns(repoUrl) {
  const { owner, repo } = extractRepoInfo(repoUrl);
  const url = `https://api.github.com/repos/${owner}/${repo}/actions/runs`;

  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'cicd-dash'
  };
  if (GITHUB_TOKEN && GITHUB_TOKEN.trim().length > 0) {
    headers.Authorization = `token ${GITHUB_TOKEN}`;
  }

  const res = await axios.get(url, { headers });

  return res.data.workflow_runs;
}

module.exports = { fetchWorkflowRuns, extractRepoInfo };
