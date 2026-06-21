# Daniel Halabi Portfolio

A dynamic full-stack portfolio for Daniel Halabi built with React, TypeScript, Tailwind CSS, Node.js, Express, MongoDB, JWT authentication, and persistent project image uploads.

## Features

- Modern responsive portfolio with Hero, About, Skills, Projects, and Contact sections
- Projects fetched dynamically from the Express/MongoDB API
- Project filters for All, Development, and UI/UX
- Project details pages with technologies, links, and image support
- Contact form that saves messages in MongoDB
- Optional email notifications through Nodemailer SMTP settings
- Protected admin login using JWT
- Admin dashboard overview with project and message totals
- Project management: add, edit, delete, image URL, MongoDB-backed image uploads, and CV replacement
- Message management: view, mark read/unread, and delete messages
- Environment-driven configuration for database, auth, and email settings

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, React Router, React Hook Form
- Backend: Node.js, Express, Mongoose, MongoDB
- Auth: JWT, bcryptjs
- Uploads: Multer with MongoDB-backed project image storage
- Email: Nodemailer
- Tooling: ESLint, TypeScript

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a local `.env` file with your MongoDB URI, JWT secret, admin credentials, and optional SMTP settings.

3. Seed the admin user and starter projects:

```bash
npm run seed
```

4. Start the backend API:

```bash
npm run server
```

5. In another terminal, start the frontend:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies `/api` requests to `http://localhost:5000`.

## Admin Routes

- `/admin/login` - admin sign in
- `/admin` - dashboard overview
- `/admin/projects` - project CRUD and image upload
- `/admin/messages` - contact message inbox

## Environment Variables

Supported backend variables:

- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `ADMIN_NAME`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_EMAIL`

Supported frontend variable:

- `VITE_API_URL`

SMTP is optional for local development. Project images uploaded from the admin are stored in MongoDB and served from `/api/uploads/projects/:id`. Existing local `/uploads` files and external image URLs are still supported.

## Scripts

```bash
npm run dev      # Start Vite frontend
npm run server   # Start Express API
npm run seed     # Seed admin and starter projects
npm run build    # Type-check and build frontend
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Production Notes

- Set a long random `JWT_SECRET`
- Use a real MongoDB connection string
- Uploaded project images are stored in MongoDB so they survive server redeploys and restarts
- Configure SMTP variables for contact notifications
- Set `VITE_API_URL` if the frontend and backend are deployed on different origins
- Never commit `.env` or credential files
