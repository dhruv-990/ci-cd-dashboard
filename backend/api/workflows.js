const { fetchWorkflowRuns } = require('../githubService');

module.exports = async (req, res) => {
	// Basic CORS for Netlify -> Vercel cross-origin requests
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	if (req.method === 'OPTIONS') {
		return res.status(200).end();
	}

	try {
		const { repo } = req.query || {};
		if (!repo) {
			return res.status(400).json({ error: 'Repository URL is required. Use ?repo=github.com/owner/repo' });
		}

		const runs = await fetchWorkflowRuns(repo);
		return res.status(200).json(
			runs.map(run => ({
				id: run.id,
				name: run.name,
				status: run.status,
				conclusion: run.conclusion,
				created_at: run.created_at,
				updated_at: run.updated_at,
				html_url: run.html_url
			}))
		);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
}; 