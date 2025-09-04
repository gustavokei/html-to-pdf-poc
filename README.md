# Assurant PDF Service (Vercel)

Serverless function to convert HTML into PDF using `@sparticuz/chromium` + `puppeteer-core` (versions above v22.13.1 are not working).

## Deploy
1. Create a new Vercel project pointing to this `vercel` folder (or root and set root dir).
2. Ensure Node.js 18+ runtime.
3. Deploy.

## Endpoint
POST /api/convert-pdf
Body: { "html": "<html>...</html>", "filename": "optional" }
Response: { ok: true, filename, pdfBase64 } or { ok: false, error }

## Local Dev
Install deps and run:
```
npm install
npx vercel dev
```
Then POST to http://localhost:3000/api/convert-pdf.
