# 🎟️ Event Booking System

A **Mini Event Management System** built with Node.js, Express.js, and MySQL. Users can browse events, book tickets with unique booking codes, and mark attendance — all through a clean RESTful API.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js v18+ |
| Framework | Express.js |
| Database | MySQL 8 |
| DB Driver | mysql2 |
| Unique Code | UUID v9 |
| API Docs | Swagger UI (OpenAPI 3.0) |
| Dev Tool | Nodemon |
| Deployment | Docker + Docker Compose |

---

## 📁 Project Structure

```
event-booking-system/
├── src/
│   ├── controllers/
│   │   ├── eventController.js
│   │   ├── bookingController.js
│   │   ├── userController.js
│   │   └── attendanceController.js
│   ├── routes/
│   │   ├── events.js
│   │   ├── bookings.js
│   │   ├── users.js
│   │   └── attendance.js
│   ├── db/
│   │   └── connection.js
│   └── app.js
├── schema.sql
├── swagger.yaml
├── Dockerfile
├── docker-compose.yml
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Option 1 — Run with Docker (Recommended)

This is the easiest way. Just one command starts everything — MySQL + Node.js server together.

### Prerequisites
- Docker installed
- Docker Compose installed

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/AmanAnsary23/event_booking.git
cd event_booking
```

**2. Start everything with Docker**
```bash
docker compose up --build
```

**3. Wait for this message in terminal:**
```
Server running on port 3000
```

**4. Open API Docs in browser:**
```
http://localhost:3000/api-docs
```

That's it! ✅ No manual database setup needed — Docker handles everything automatically.

---

## ⚙️ Option 2 — Run Manually (Without Docker)

### Prerequisites
- Node.js v18+
- MySQL 8 running locally

### Step 1 — Clone the Repository
```bash
git clone https://github.com/AmanAnsary23/event_booking.git
cd event_booking
```

### Step 2 — Install Dependencies
```bash
npm install
```

### Step 3 — Configure Environment Variables
Create a `.env` file in the root directory:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=event_booking
PORT=3000
```

### Step 4 — Setup Database

**Option A — Using MySQL CLI:**
```bash
mysql -u root -p < schema.sql
```

**Option B — Using DBeaver:**
1. Open DBeaver and connect to your MySQL instance
2. Open SQL Editor
3. Open `schema.sql` file and run it

### Step 5 — Start the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

**Server will start at:**
```
http://localhost:3000
```

---

## 📖 API Documentation

Swagger UI is available at:
```
http://localhost:3000/api-docs
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/events` | List all upcoming events |
| POST | `/events` | Create a new event |
| POST | `/bookings` | Book a ticket for a user |
| GET | `/users/:id/bookings` | Get all bookings by a user |
| POST | `/events/:id/attendance` | Mark attendance via booking code |

---

## 📋 Sample API Requests

### Create a User (via SQL)
```sql
INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com');
```

### Create an Event
```http
POST /events
Content-Type: application/json

{
  "title": "Tech Conference 2026",
  "description": "A great tech event",
  "date": "2026-12-01 10:00:00",
  "total_capacity": 100
}
```

**Response:**
```json
{
  "success": true,
  "message": "Event created",
  "eventId": 1
}
```

### Get All Events
```http
GET /events
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Tech Conference 2026",
      "description": "A great tech event",
      "date": "2026-12-01T04:30:00.000Z",
      "total_capacity": 100,
      "remaining_tickets": 99
    }
  ]
}
```

### Book a Ticket
```http
POST /bookings
Content-Type: application/json

{
  "user_id": 1,
  "event_id": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking successful",
  "booking_code": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Get User Bookings
```http
GET /users/1/bookings
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "booking_code": "550e8400-e29b-41d4-a716-446655440000",
      "booking_date": "2026-03-29T10:00:00.000Z",
      "title": "Tech Conference 2026",
      "date": "2026-12-01T04:30:00.000Z"
    }
  ]
}
```

### Mark Attendance
```http
POST /events/1/attendance
Content-Type: application/json

{
  "booking_code": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Attendance marked",
  "total_tickets_booked": 1
}
```

---

## 🗄️ Database Schema

4 tables with proper foreign key constraints:

| Table | Description |
|-------|-------------|
| `users` | Stores user information |
| `events` | Stores event details with capacity |
| `bookings` | Stores ticket bookings with unique code |
| `event_attendance` | Stores attendance records |

See `schema.sql` for full schema.

---

## 🔒 Key Features

- ✅ **Race condition handling** — MySQL transactions with `FOR UPDATE` lock prevents double booking
- ✅ **Unique booking code** — UUID generated for every booking
- ✅ **Input validation** — All endpoints validate required fields
- ✅ **Error handling** — Proper HTTP status codes and error messages
- ✅ **Clean architecture** — Separation of concerns (routes / controllers / db)
- ✅ **OpenAPI 3.0 docs** — Swagger UI for easy API testing
- ✅ **Docker support** — One command deployment with Docker Compose

---

## 👨‍💻 Author

**Aman Ansary**
- GitHub: [@AmanAnsary23](https://github.com/AmanAnsary23)
- LinkedIn: [aman-ansary](https://linkedin.com/in/aman-ansary)
