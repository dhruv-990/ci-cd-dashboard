# CI/CD Dashboard

A web-based dashboard for viewing GitHub Actions CI/CD workflow runs for any repository.

## Features

- 🚀 View CI/CD workflow runs for any GitHub repository
- 📊 Real-time status and conclusion information
- ⏱️ Duration tracking for workflow runs
- 🔗 Direct links to GitHub workflow details
- 💻 Simple web interface - just paste a repository URL

## How to Use

1. Start the backend server (see `backend/README.md` for setup)
2. Start the frontend (see `frontend/README.md` for setup)
3. Enter any GitHub repository URL in the format:
   - `github.com/owner/repo`
   - `owner/repo`
   - `github.com/owner/repo.git`
4. View the CI/CD dashboard with workflow runs, status, and timing

## Quick Start

### Backend
```bash
cd backend
npm install
# Create .env file with GITHUB_TOKEN (optional for public repos)
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Supported Repository Formats

- `facebook/react` - Owner/Repo format
- `github.com/microsoft/vscode` - Full GitHub URL
- `github.com/vercel/next.js.git` - Git clone URL

## Requirements

- Node.js 14+
- GitHub Personal Access Token (classic) with `repo` scope for private repos
- Repository must have GitHub Actions enabled

## Architecture

- Backend: Express.js server with GitHub API integration
- Frontend: React.js dashboard with real-time updates
- API: RESTful endpoint for fetching workflow runs
