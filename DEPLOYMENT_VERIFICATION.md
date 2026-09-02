# EcoSwap+ Deployment Verification

This checklist must be completed with the real deployed URLs. Do not commit `.env` files or credentials.

## Render API

1. Configure `MONGO_URI`, `JWT_SECRET`, and `CLIENT_URL` in Render secrets.
2. Confirm `GET https://<render-service>/api/health` returns `{ "ok": true }`.
3. Register a test user and log in through `/api/auth`.
4. Create a listing with an image.
5. Create, accept, and complete a swap. Confirm both users receive +50 points, +7000L water, and +15kg carbon impact.

## Vercel frontend

1. Set the Vercel project **Root Directory** to `frontend`.
2. Configure `VITE_API_URL=https://<render-service>/api` in Vercel environment variables.
3. Confirm the site loads over HTTPS.
4. Confirm browser Network requests target the Render API, not localhost.
5. Test two accounts through login, listing, swap, chat, and impact flows.
6. Test at 390px and desktop widths.

## Security

- `node_modules/`, `.env`, `.env.*`, `dist/`, and `uploads/` are ignored by Git.
- Use a long random JWT secret.
- Never place MongoDB credentials in frontend code.
- Restrict MongoDB Atlas network access to the deployed API where possible.
- Use object storage for production uploads instead of local Render disk.
