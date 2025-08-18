# CI/CD Dashboard Backend

This backend service fetches GitHub Actions workflow runs for any repository.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with your GitHub token:
   ```
   GITHUB_TOKEN=your_github_token_here
   PORT=5000
   ```

3. Get a GitHub Personal Access Token:
   - Go to https://github.com/settings/tokens
   - Generate a new token with `repo` scope
   - Copy the token to your `.env` file

4. Start the server:
   ```bash
   node server.js
   ```

## API Endpoints

- `GET /api/workflows?repo=owner/repo` - Get workflow runs for a repository
- Supports formats: `owner/repo`, `github.com/owner/repo`, `github.com/owner/repo.git`

## Environment Variables

- `GITHUB_TOKEN` (required): GitHub Personal Access Token
- `PORT` (optional): Server port, defaults to 5000 