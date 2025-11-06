SlotSwapper – Full Stack Slot Swapping Application
✅ Tech Stack
Frontend

Next.js 14 (App Router)

React

TypeScript

Tailwind CSS

Context API for global auth state

Backend

Node.js + Express

MongoDB + Mongoose

JWT Authentication

REST APIs

✅ Features Implemented
🔐 User Authentication

Register

Login

JWT-based protected routes

User session stored via localStorage

📅 Event Management

Users can:

Create events

View their events

Mark events as BUSY or SWAPPABLE

Event fields:

title
startTime
endTime
status (BUSY | SWAPPABLE | SWAP_PENDING)
userId

🔄 Swap System (Core Logic)
✅ GET /api/swaps/swappable-slots

Returns swappable slots from other users.

✅ POST /api/swaps/request

Creates a swap request.

✅ POST /api/swaps/respond

Accept or reject a swap:

If rejected → slots revert back to SWAPPABLE

If accepted → userId of both events is swapped

Status returns to BUSY

✅ Frontend Pages
Route	Description
/auth/register	User signup
/auth/login	User login
/dashboard	User’s events
/new	Create new event
/marketplace	View public swappable slots
/requests	Incoming & outgoing swap requests
✅ Project Structure
Backend
backend/
 ├── config/db.js
 ├── controllers/
 ├── middleware/
 ├── models/
 ├── routes/
 ├── server.js
 └── .env

Frontend
frontend/
 ├── src/
 │   ├── app/
 │   │   ├── auth/
 │   │   ├── dashboard/
 │   │   ├── marketplace/
 │   │   ├── requests/
 │   │   └── new/
 │   ├── components/
 │   │   ├── Navbar.tsx
 │   │   └── Providers.tsx
 ├── .env.local
 ├── package.json
 └── next.config.js

✅ Environment Variables
Backend (.env)
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5000/api

✅ Run Locally
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev


Frontend runs on:
👉 http://localhost:3000

Backend runs on:
👉 http://localhost:5000

✅ API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register
POST	/api/auth/login	Login
Events
Method	Endpoint	Description
POST	/api/events	Create event
GET	/api/events	Get my events
PATCH	/api/events/:id/status	Update event status
Swaps
Method	Endpoint	Description
GET	/api/swaps/swappable-slots	Get available swappable events
POST	/api/swaps/request	Create swap request
POST	/api/swaps/respond	Accept/Reject swap
✅ Assumptions

Users can swap only SWAPPABLE events.

Swap is one-to-one only.

Events do not require calendar conflict checks.

Real-time notifications are not included yet (bonus feature).

What Is Not Implemented 

 Calendar drag-and-drop UI
 Real-time notifications (WebSockets)
 Unit tests
 Deployment (local only)
 Complex conflict checking

✅ Future Improvements

✅ Add WebSocket realtime notifications
✅ Add drag-and-drop calendar UI
✅ Add unit tests for swap logic
✅ Deploy backend + frontend
