# 🚀 CI/CD Dashboard Viewer

A simple React-based dashboard to visualize GitHub Actions workflow runs for your repository. It fetches the latest builds, shows their status, duration, and provides direct links to GitHub.

> 🔧 Currently configured to work with your own GitHub repo and token (set in `.env`).

---

## 🖼️ Features

- ✅ Fetches latest GitHub Actions workflow runs
- ✅ Displays status (success, failure, in progress)
- ✅ Shows build start/end time and duration
- ✅ Clickable link to each workflow run on GitHub
- 🧪 Useful for monitoring build pipelines at a glance

---

## 📦 Tech Stack

- React.js (frontend)
- GitHub REST API
- dotenv (for managing tokens)
- Node.js (if backend added later)
- Docker (optional setup available)

---

## 🚀 Getting Started (Local Setup)

### 1. Clone this repo

```bash
git clone https://github.com/dhruv-990/ci-cd-dashboard.git
cd ci-cd-dashboard/frontend
