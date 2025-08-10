# Appointment Booking App

A full-stack appointment booking app for a small clinic.

## Tech Stack
- **Frontend:** ReactJS (Vite, Material UI)
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **Deployment:** Vercel(frontend), Render (backend)

## Features
- Patient: Register, login, view slots, book slot, view bookings
- Admin: Login, view all bookings
- Auth: JWT, role-based access
- Error handling, input validation, loading states

## Setup & Local Development
1. **Clone the repo:**
   ```bash
   git clone <repo-url>
   cd assignment-wundrsight
   ```
2. **Install frontend dependencies:**
   ```bash
   cd appointment-booking-frontend
   npm install
   npm run dev
   ```
3. **Install backend dependencies:**
   ```bash
   cd ../appointment-booking-backend
   npm install
   npm start
   ```
4. **Environment variables:**
   - Backend: `MONGO_URI` or `DATABASE_URL`, `JWT_SECRET`

## Deployment
- **Frontend:** Deploy to Vercel
- **Backend:** Deploy to Render

## Test Credentials
- Patient: `patient@example.com` / `Passw0rd!`
- Admin: `admin@example.com` / `Passw0rd!`

## API Endpoints
- `POST /api/register` – `{name, email, password}`
- `POST /api/login` – `{email, password}`
- `GET /api/slots?from=YYYY-MM-DD&to=YYYY-MM-DD`
- `POST /api/book` – `{slotId}`
- `GET /api/my-bookings` (auth: patient)
- `GET /api/all-bookings` (auth: admin)

## Quick Verification (curl)
```bash
# Register
curl -X POST http://localhost:5003/api/register -H 'Content-Type: application/json' -d '{"name":"Test","email":"patient@example.com","password":"Passw0rd!"}'
# Login
curl -X POST http://localhost:5003/api/login -H 'Content-Type: application/json' -d '{"email":"patient@example.com","password":"Passw0rd!"}'
# Get Slots
curl http://localhost:5003/api/slots?from=2025-08-07&to=2025-08-13 -H 'Authorization: Bearer <token>'
# Book Slot
curl -X POST http://localhost:5003/api/book -H 'Content-Type: application/json' -H 'Authorization: Bearer <token>' -d '{"slotId":"<slotId>"}'
# My Bookings
curl http://localhost:5003/api/my-bookings -H 'Authorization: Bearer <token>'
```

## Architecture Notes
- **Folder Structure:** Separate frontend and backend, clear module boundaries
- **Auth & RBAC:** JWT, role checked on each route
- **Booking:** Unique constraint on `bookings.slot_id` to prevent double booking
- **Error Handling:** API returns JSON error shapes, frontend shows toasts/messages
- **Loading States:** Spinners for API calls

## Known Limitations & Next Steps
- No password reset flow
- No email verification
- No calendar view for slots
- Next: Add tests, CI, more admin features

## Submission Checklist
- [✅] Frontend URL: https://assignment-wundrsight-dss1-4cp729cj3.vercel.app/
- [✅] API URL: https://assignment-wundrsight.onrender.com/
- [✅] Repo URL: https://github.com/imhrsit/assignment-wundrsight
- [✅] Run locally: README steps verified
- [✅] Postman/curl steps included
