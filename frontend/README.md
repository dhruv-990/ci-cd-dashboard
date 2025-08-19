# Frontend (React) - Netlify Deploy

## Local Dev
```bash
npm install
npm start
```

## Configure API Base URL
Set `REACT_APP_API_BASE` to your backend URL (Vercel deployment):
- Example: `https://<your-vercel-project>.vercel.app`

For local dev, it defaults to `http://localhost:5000`.

## Netlify Deployment
1. Push to GitHub
2. Create a new site on Netlify from Git repo
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
4. Environment variables:
   - `REACT_APP_API_BASE` = `https://<your-vercel-project>.vercel.app`
5. Deploy
