const axios = require('axios');
require('dotenv').config();

const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO } = process.env;

async function fetchWorkflowRuns() {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/runs`;

  const res = await axios.get(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json'
    }
  });

  return res.data.workflow_runs;
}

module.exports = { fetchWorkflowRuns };
