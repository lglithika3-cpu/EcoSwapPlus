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

### Backend on Render

Create a Render Web Service from this repository with root directory `backend`, build command `npm install`, and start command `npm start`. Configure `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, and `PORT` in the service environment. Use MongoDB Atlas for `MONGO_URI`; never commit `.env`.

### Frontend on Vercel

Import the repository, set root directory to `frontend`, and configure `VITE_API_URL` to the deployed backend URL ending in `/api`. Vercel uses `frontend/vercel.json` for SPA fallback routing.

### Production storage

Replace the development `backend/uploads` disk with persistent object storage (for example S3 or Cloudinary) before production. The development upload flow is validated locally; hosted storage credentials and live URLs must be supplied in the deployment dashboards.

## Verification checklist

- Login and registration validation
- Clothing creation, edit, delete, and image upload
- Search, category, size, condition, and location filtering
- Persistent wishlist, messaging, swaps, and reviews
- Two-user swap lifecycle: pending -> accepted -> completed
- Admin user/listing review and listing removal
