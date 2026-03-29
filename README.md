# 🎟️ Event Booking System

A **Mini Event Management System** built as part of a selection test for Junior Node.js Backend Developer role. Users can browse events, book tickets, and mark attendance — all powered by a clean RESTful API.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MySQL 8 |
| ORM/Driver | mysql2 |
| Auth/Unique Code | UUID v9 |
| API Docs | Swagger UI (OpenAPI 3.0) |
| Dev Tool | Nodemon |

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
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MySQL 8 (or Docker)

---

### Step 1 — Run MySQL via Docker
```bash
docker run --name mysql-event \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=event_booking \
  -p 3306:3306 \
  -d mysql:8
```

> Skip this step if you already have MySQL installed locally.

---

### Step 2 — Clone the Repository
```bash
git clone https://github.com/AmanAnsary23/event-booking-system.git
cd event-booking-system
```

---

### Step 3 — Install Dependencies
```bash
npm install
```

---

### Step 4 — Configure Environment Variables
Create a `.env` file in the root directory:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=event_booking
PORT=3000
```

---

### Step 5 — Import Database Schema
Run the `schema.sql` file to create all tables:

**Option A — Using MySQL CLI:**
```bash
mysql -u root -p event_booking < schema.sql
```

**Option B — Using DBeaver:**
1. Open DBeaver and connect to your MySQL instance
2. Open SQL Editor
3. Open `schema.sql` and run it

---

### Step 6 — Start the Server
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

Server will start at:
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

## 📋 Sample API Usage

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

### Book a Ticket
```http
POST /bookings
Content-Type: application/json

{
  "user_id": 1,
  "event_id": 1
}
```

Response includes a unique `booking_code` for attendance.

### Mark Attendance
```http
POST /events/1/attendance
Content-Type: application/json

{
  "booking_code": "your-unique-booking-code"
}
```

---

## 🗄️ Database Schema

4 tables: `users`, `events`, `bookings`, `event_attendance`

See `schema.sql` for full schema with foreign key constraints.

---

## 🔒 Key Features

- ✅ Race condition handling using **MySQL transactions + FOR UPDATE lock**
- ✅ Unique booking code generated via **UUID**
- ✅ Input validation on all endpoints
- ✅ Proper HTTP status codes
- ✅ Clean separation of concerns (routes / controllers / db)
- ✅ OpenAPI 3.0 documentation with Swagger UI

---

## 👨‍💻 Author

**Aman Ansary**
- GitHub: [@AmanAnsary23](https://github.com/AmanAnsary23)
- LinkedIn: [aman-ansary]([https://linkedin.com/in/aman-ansary](https://www.linkedin.com/in/aman-ansary-00a97b31a/))
