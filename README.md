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

Set `MONGO_URI`, `JWT_SECRET`, and `CLIENT_URL` in `backend/.env`. The API exposes `/api/health`, `/api/auth`, `/api/clothing`, `/api/swaps`, and `/api/impact`.

## Deployment

Deploy `frontend` to Vercel with `VITE_API_URL` set to the Render API URL. Deploy `backend` to Render with the variables in `.env.example` and a persistent upload storage strategy for production.
