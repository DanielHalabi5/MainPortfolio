# Daniel Halabi Portfolio

A dynamic full-stack portfolio for Daniel Halabi built with React, TypeScript, Tailwind CSS, Node.js, Express, MongoDB, JWT authentication, and Cloudinary-ready project image uploads.

## Features

- Modern responsive portfolio with Hero, About, Skills, Projects, and Contact sections
- Projects fetched dynamically from the Express/MongoDB API
- Project filters for All, Development, and UI/UX
- Project details pages with technologies, links, and image support
- Contact form that saves messages in MongoDB
- Optional email notifications through Nodemailer SMTP settings
- Protected admin login using JWT
- Admin dashboard overview with project and message totals
- Project management: add, edit, delete, image URL, and Cloudinary upload support
- Message management: view, mark read/unread, and delete messages
- Clean environment configuration with `.env.example`

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, React Router, React Hook Form
- Backend: Node.js, Express, Mongoose, MongoDB
- Auth: JWT, bcryptjs
- Uploads: Multer, Cloudinary
- Email: Nodemailer
- Tooling: ESLint, TypeScript

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create an environment file:

```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB URI, JWT secret, admin credentials, and optional Cloudinary/SMTP settings.

4. Seed the admin user and starter projects:

```bash
npm run seed
```

5. Start the backend API:

```bash
npm run server
```

6. In another terminal, start the frontend:

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

See `.env.example` for all supported variables:

- `MONGODB_URI`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_EMAIL`

Cloudinary and SMTP are optional for local development. Project image URLs can be entered manually if Cloudinary is not configured.

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
- Configure Cloudinary credentials for image uploads
- Configure SMTP variables for contact notifications
- Set `VITE_API_URL` if the frontend and backend are deployed on different origins
- Never commit `.env` or credential files
