# Event Booking System

## 📌 Project Overview
This is a mini event booking system where users can:
- View events
- Book tickets
- Check bookings
- Mark attendance

---

## ⚙️ Tech Stack
- Node.js
- Express.js
- MySQL
- Swagger (OpenAPI)

---

## 🛢️ Database Setup

1. Open MySQL Workbench
2. Create database:
```sql
CREATE DATABASE event_db;
USE event_db;


🚀 Run the Project

Install dependencies:
npm install

Start server:
node app.js

Open in browser:
http://localhost:3000/events


📡 API Endpoints
GET /events
Get all events

POST /events
Create a new event

POST /bookings
Book tickets

GET /users/:id/bookings
Get user bookings

POST /events/:id/attendance
Mark attendance


📄 Swagger Docs
Open:
http://localhost:3000/api-docs


🧪 Testing
Use Postman to test all APIs.

