# EcoSwap+

Sustainable clothing exchange marketplace MVP.

## Run locally

```powershell
cd frontend
npm install
npm run dev
```

The frontend is a polished prototype and can run without the API. To enable persistence and authentication:

```powershell
cd backend
npm install
Copy-Item .env.example .env
npm run dev
```

Set `MONGO_URI`, `JWT_SECRET`, and `CLIENT_URL` in `backend/.env`. For a local MongoDB service, use `MONGO_URI=mongodb://127.0.0.1:27017/ecoswap`. The API exposes `/api/health`, `/api/auth`, `/api/clothing`, `/api/swaps`, `/api/messages`, `/api/wishlist`, `/api/reviews`, and `/api/impact`.

The frontend uses a bundled clothing illustration at `frontend/public/assets/clothing-placeholder.svg`, so local development does not depend on external image hosts. Uploaded JPG, PNG, and WebP files are stored under `backend/uploads` in development.

## Deployment

Deploy `frontend` to Vercel with `VITE_API_URL` set to the Render API URL. Deploy `backend` to Render with the variables in `.env.example` and a persistent upload storage strategy for production.
