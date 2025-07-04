const express = require('express');
const cors = require('cors');
const { fetchWorkflowRuns } = require('./githubService');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/workflows', async (req, res) => {
  try {
    const runs = await fetchWorkflowRuns();
    res.json(runs.map(run => ({
      id: run.id,
      name: run.name,
      status: run.status,
      conclusion: run.conclusion,
      created_at: run.created_at,
      updated_at: run.updated_at,
      html_url: run.html_url
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
