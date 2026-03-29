# Event Booking System

A Mini Event Management System built with Node.js, Express.js, and MySQL.

## Tech Stack
- Node.js + Express.js
- MySQL (via mysql2)
- Swagger UI (API Docs)

## Project Setup

### Prerequisites
- Node.js installed
- MySQL running (or Docker)

### 1. Run MySQL via Docker
```bash
docker run --name mysql-event -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=event_booking -p 3306:3306 -d mysql:8
```

### 2. Clone the repository
```bash
git clone <your-repo-link>
cd event-booking-system
```

### 3. Install dependencies
```bash
npm install
```

### 4. Setup environment variables
Create a `.env` file:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=event_booking
PORT=3000
```

### 5. Import the database schema
Run the `schema.sql` file in DBeaver or MySQL CLI:
```bash
mysql -u root -p event_booking < schema.sql
```

### 6. Run the server
```bash
npm run dev
```

## API Documentation
Open browser and visit:
```
http://localhost:3000/api-docs
```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /events | List all upcoming events |
| POST | /events | Create a new event |
| POST | /bookings | Book a ticket |
| GET | /users/:id/bookings | Get user bookings |
| POST | /events/:id/attendance | Mark attendance |