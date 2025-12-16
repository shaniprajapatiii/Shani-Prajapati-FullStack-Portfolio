# Shani Prajapati Portfolio & Admin

Full-stack portfolio site with an admin panel to manage skills, experience, certificates, and projects. Frontend is React + Vite + TypeScript with Tailwind and Framer Motion; backend is Express + TypeScript + MongoDB secured by JWT (cookie-based) with admin role guard.

## Tech Stack
- Frontend: React, Vite, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, TypeScript, MongoDB (Mongoose), Zod validators
- Auth: JWT access token stored in HTTP-only cookie, admin role required for mutations

## Features
- Public portfolio sections: Hero, About, Skills, Projects, Experience, Education, Certifications, Contact
- Admin CRUD for Skills, Experience, Certificates, Projects
- Animated UI with smooth scrolling and section-aware navbar
- Validation on both client (basic) and server (Zod) for consistent data

## Project Structure (top-level)
- `client/` — frontend app (React/Vite)
- `server/` — backend API (Express/TS)
- `MD Files/` — documentation (guides, API examples, migration notes)

## Backend Highlights
- Models: `Skill`, `Experience`, `Certificate`, `Project` in `server/src/models`
- Validation: Zod schemas in `server/src/validators` (dates, gradients, colors, required fields)
- Auth middleware: `authenticate`, `requireAdmin` in `server/src/middleware/auth.ts`
- Routes: `/api/skills`, `/api/experience`, `/api/certificates`, `/api/projects` (CRUD; POST/PATCH/DELETE require admin)

## Frontend Highlights
- Section components in `client/src/components`; admin forms in `client/src/components/admin`
- Data hooks: `useApi` (public fetch) and `useAuthenticatedApi` (auth fetch with cookies)
- Auth context handles login/check/logout via cookies: `client/src/context/AuthContext.tsx`
- Animated navbar targets section anchors (e.g., `#certificates` in Experience section)

## Required Fields (admin forms)
- Skill: `name`, `category`, `icon` (emoji), `color` (hex)
- Experience: `title`, `company`, `startDate`, `responsibilities[]`; `endDate` optional (null when currently working)
- Certificate: `title`, `issuer`, `issueDate`, `description`, `skills[]`, `highlights[]`, `gradient`, `verificationUrl` optional
- Project: `title`, `slug`, `description`, `fullDescription`, `gradient`; optional `techStack[]`, `features[]`, `links`, `imageUrl`

## Admin Access
- Default (from docs): email `admin@example.com`, password `supersecret`
- Auth uses HTTP-only cookie; all POST/PATCH/DELETE routes require admin role
