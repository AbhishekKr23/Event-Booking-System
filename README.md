# 🎟️ Event Booking System

## 📌 Project Overview

This is a **Mini Event Booking System** built using **Node.js, Express, and MySQL**.
Users can browse events, book tickets, view their bookings, and mark attendance.

---

## ✨ Features

* View all available events
* Book tickets with **transaction handling**
* Generate **unique booking codes**
* Check user bookings
* Mark attendance using booking code
* API documentation using **Swagger (OpenAPI)**

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MySQL**
* **Swagger (OpenAPI)**
* **Postman**

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/AbhishekKr23/Event-Booking-System.git
cd Event-Booking-System
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup database

* Open MySQL Workbench
* Run the `event_db.sql` file

### 4. Configure environment

Create a `.env` file and add:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=event_db
```

### 5. Start server

```bash
node app.js
```

### 6. Open in browser

```bash
http://localhost:3000/events
```

---

## 🔗 API Endpoints

| Method | Endpoint               | Description       |
| ------ | ---------------------- | ----------------- |
| GET    | /events                | Get all events    |
| POST   | /events                | Create new event  |
| POST   | /bookings              | Book tickets      |
| GET    | /users/:id/bookings    | Get user bookings |
| POST   | /events/:id/attendance | Mark attendance   |

---

## 📄 API Documentation

Swagger UI:

```
http://localhost:3000/api-docs
```

---

## 🧪 Testing

* Use the **Postman collection** provided in the repository
* Or test directly using Swagger UI

---

## 🗄️ Database Schema

Tables included:

* Users
* Events
* Bookings
* Attendance

All tables use **primary keys and foreign key constraints**.

---

## ⚡ Key Concepts Used

* REST API design
* MySQL relationships
* Transaction handling (to avoid race conditions)
* Input validation
* Swagger API documentation


---

