# Dobot-Challenge-Uploader

A minimal web application for uploading large Docker images to Aliyun OSS.

## Setup

1. Install dependencies: `npm install`
2. Configure OSS credentials in `server.js` (replace placeholders with your Aliyun OSS details)
3. Run locally: `npm start`

## Deployment

### Frontend (GitHub Pages)
- Pushed to GitHub, Pages enabled via Actions.
- URL: `https://chrisleng1.github.io/Dobot-Challenge-Uploader/`

### Backend (Heroku)
1. Create Heroku app: `heroku create your-app-name`
2. Push to Heroku: `git push heroku main`
3. Set environment variables for OSS credentials.

### Full Stack (Vercel)
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel`
3. Configure OSS env vars in Vercel dashboard.

## Usage

Open the deployed frontend URL, select a file, and upload. Files are sent to backend and uploaded to OSS.
