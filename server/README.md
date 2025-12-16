# Kinetic Drop Site Backend

Express + MongoDB API for the portfolio site with admin-only CRUD and Cloudinary uploads.

## Requirements
- Node 18+
- MongoDB Atlas URI
- Cloudinary account (cloud name, API key/secret)

## Setup
1. Copy `.env.example` to `.env` and fill values.
2. Install deps: `npm install` (or `bun install`).
3. Run dev: `npm run dev`.
4. Build: `npm run build`; start: `npm start`.

## API
Base path: `/api`
- `GET /health`
- Auth: `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`
- Skills: `GET /skills`, admin `POST /`, `PATCH /:id`, `DELETE /:id`
- Projects: same pattern
- Experience: same pattern
- Certificates: same pattern
- Media: `POST /media/upload` (multipart `file`) -> `{ url, key }`

## Auth
- Admin seeded on start from `ADMIN_EMAIL`/`ADMIN_PASSWORD`.
- Login sets httpOnly cookies (`accessToken`, `refreshToken`).

## Deployment
- Set env vars on your host (Render/Fly/Railway/EC2).
- Allow CORS origin (`CORS_ORIGIN`) to your frontend domain.
- Use HTTPS so cookies stay secure.
