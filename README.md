# EcoSwap+

EcoSwap+ is a sustainable clothing exchange marketplace. Users can list wearable clothing, discover nearby items, request swaps, message other members, complete exchanges, and track environmental impact.

## Features

- JWT registration and login with bcrypt password hashing
- Clothing listing creation, editing, deletion, image upload, and discovery
- Search and filtering by category, size, condition, location, and value
- Wishlist, messaging, reviews, and two-user swap workflow
- Eco points, water-saved, carbon-reduction, leaderboard, and admin views
- Responsive React interface with validation, toasts, charts, and dark mode

## Technology Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, Recharts, Lucide React
- Backend: Node.js, Express, Mongoose, JWT, bcryptjs, Multer
- Database: MongoDB Atlas
- Deployment targets: Vercel for the frontend and Render for the API

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

### Environment variables

Backend variables:

```dotenv
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<database>
JWT_SECRET=<long-random-secret>
CLIENT_URL=https://<frontend-domain>
```

The backend accepts both `MONGO_URI` and `MONGODB_URI`; use `MONGO_URI` as the canonical name. Keep real values in local or hosting-provider secret settings and never commit `.env` files.

The frontend uses a bundled clothing illustration at `frontend/public/assets/clothing-placeholder.svg`, so local development does not depend on external image hosts. Uploaded JPG, PNG, and WebP files are stored under `backend/uploads` in development.

## Deployment

### Backend on Render

Create a Render Web Service from this repository with root directory `backend`, build command `npm install`, and start command `npm start`. Configure `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, and `PORT` in the service environment. Use MongoDB Atlas for `MONGO_URI`; never commit `.env`.

### Frontend on Vercel

Import the repository, set root directory to `frontend`, and configure `VITE_API_URL` to the deployed backend URL ending in `/api`. Vercel uses `frontend/vercel.json` for SPA fallback routing.

### Deployment status

- Local backend: verified with MongoDB Atlas and `GET /api/health` returning HTTP 200.
- Local frontend: production build verified with `npm run build`.
- GitHub repository: https://github.com/lglithika3-cpu/EcoSwapPlus
- Render API URL: https://ecoswapplus.onrender.com
- Vercel frontend URL: pending deployment; set `VITE_API_URL` after the Render URL exists.
- Live end-to-end testing: pending the deployed Render and Vercel URLs.

### Production storage

Replace the development `backend/uploads` disk with persistent object storage (for example S3 or Cloudinary) before production. The development upload flow is validated locally; hosted storage credentials and live URLs must be supplied in the deployment dashboards.

## Verification checklist

- Login and registration validation
- Clothing creation, edit, delete, and image upload
- Search, category, size, condition, and location filtering
- Persistent wishlist, messaging, swaps, and reviews
- Two-user swap lifecycle: pending -> accepted -> completed
- Admin user/listing review and listing removal

## Screenshots

Add screenshots from the deployed HTTPS site before submitting: dashboard, browse/filter view, item details, swap flow, messages, impact dashboard, leaderboard, and admin panel. Store them under `docs/screenshots/` and link them here.

## Internship submission checklist

- GitHub repository: https://github.com/lglithika3-cpu/EcoSwapPlus
- Live frontend URL: pending Vercel deployment
- Live backend URL: pending Render deployment; verify `/api/health`
- Demo video: record the registration, listing, swap, messaging, and impact flows after deployment
- Screenshots: add the deployed UI screenshots under `docs/screenshots/`
- Submission form: complete the institution or internship form with the links above
