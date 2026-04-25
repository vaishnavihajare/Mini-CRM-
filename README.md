<<<<<<< HEAD
<<<<<<< HEAD
# Mini CRM - Lead Tracker

A lead management system with a Kanban board interface. Drag and drop leads between different status columns to track your sales pipeline.

## Features

- User authentication (Register/Login)
- Kanban board with 5 status columns (New, Contacted, Qualified, Won, Lost)
- Drag and drop leads between columns
- Create, edit, and delete leads
- Search and filter leads
- Responsive design

## Tech Stack

**Frontend:** React, Vite, Bootstrap, React DnD  
**Backend:** Node.js, Express, PostgreSQL  
**Authentication:** JWT

## Installation

### 1. Clone the repository
=======
=======
>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
# 🚀 Mini CRM - Lead Tracker

A simple and efficient **Lead Management System** with a Kanban board interface to track your sales pipeline. Easily manage leads by dragging and dropping them across different stages.

---

## 📌 Features

* 🔐 User Authentication (Register / Login)
* 📊 Kanban Board with 5 Status Columns:

  * New
  * Contacted
  * Qualified
  * Won
  * Lost
* 🖱️ Drag & Drop Leads Between Columns
* ➕ Create, ✏️ Edit, ❌ Delete Leads
* 🔍 Search and Filter Leads
* 📱 Fully Responsive Design

---

## 🛠️ Tech Stack

**Frontend**

* React
* Vite
* Bootstrap
* React DnD

**Backend**

* Node.js
* Express

**Database**

* PostgreSQL

**Authentication**

* JWT (JSON Web Token)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

<<<<<<< HEAD
>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
=======
>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
```bash
git clone https://github.com/PranavsinhRajput/mini-crm-project.git
cd mini-crm-project
```

<<<<<<< HEAD
<<<<<<< HEAD
### 2. Setup Backend
=======
=======
>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
---

### 2️⃣ Backend Setup

<<<<<<< HEAD
>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
=======
>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
```bash
cd backend
npm install
```

<<<<<<< HEAD
<<<<<<< HEAD
Create `.env` file:
=======
#### Create `.env` file

>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
=======
#### Create `.env` file

>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
```env
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/mini_crm
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

<<<<<<< HEAD
<<<<<<< HEAD
Create database and run schema:
=======
#### Setup Database

>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
=======
#### Setup Database

>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
```bash
psql -U postgres
CREATE DATABASE mini_crm;
\q

psql -U postgres -d mini_crm -f database/schema.sql
```

<<<<<<< HEAD
<<<<<<< HEAD
Start backend:
=======
#### Start Backend Server

>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
=======
#### Start Backend Server

>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
```bash
npm start
```

<<<<<<< HEAD
<<<<<<< HEAD
### 3. Setup Frontend
=======
=======
>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
---

### 3️⃣ Frontend Setup

<<<<<<< HEAD
>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
=======
>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
```bash
cd frontend
npm install
```

<<<<<<< HEAD
<<<<<<< HEAD
Create `.env` file:
=======
#### Create `.env` file

>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
=======
#### Create `.env` file

>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
```env
VITE_API_URL=http://localhost:5000/api
```

<<<<<<< HEAD
<<<<<<< HEAD
Start frontend:
=======
#### Start Frontend

>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
=======
#### Start Frontend

>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
```bash
npm run dev
```

<<<<<<< HEAD
<<<<<<< HEAD
## Usage

1. Open `http://localhost:3000` in your browser
2. Register a new account
3. Login with your credentials
4. Create leads and drag them between columns
5. Use search and filters to manage your leads

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Leads (Protected)
- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create lead
- `PUT /api/leads/:id` - Update lead
- `PATCH /api/leads/:id/status` - Update lead status
- `DELETE /api/leads/:id` - Delete lead

## Project Structure
```
mini-crm-project/
=======
=======
>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
---

## ▶️ Usage

1. Open your browser and go to:

   ```
   http://localhost:3000
   ```
2. Register a new account
3. Login with your credentials
4. Create and manage leads
5. Drag and drop leads across different stages
6. Use search and filters for better management

---

## 🔗 API Endpoints

### 🔐 Authentication

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | /api/auth/register | Register new user |
| POST   | /api/auth/login    | Login user        |

---

### 📋 Leads (Protected Routes)

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| GET    | /api/leads            | Get all leads      |
| POST   | /api/leads            | Create new lead    |
| PUT    | /api/leads/:id        | Update lead        |
| PATCH  | /api/leads/:id/status | Update lead status |
| DELETE | /api/leads/:id        | Delete lead        |

---

## 📁 Project Structure

```
mini-crm-project/
│
<<<<<<< HEAD
>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
=======
>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
├── backend/          # Node.js API
├── frontend/         # React application
└── README.md
```
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812

---

## ✨ Future Improvements

* Role-based access control
* Email notifications
* Analytics dashboard
* Deployment support (Docker / Cloud)

---

## 📄 License

This project is open-source and available for learning and development purposes.

---

## 🙌 Author

Developed by **Vaishnavi hajare**

---

⭐ If you like this project, consider giving it a star!
<<<<<<< HEAD
>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
=======
>>>>>>> af193c14bf85e85ba3c3d95752dd1dac94e82812
