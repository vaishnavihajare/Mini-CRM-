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

```bash
git clone https://github.com/PranavsinhRajput/mini-crm-project.git
cd mini-crm-project
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

#### Create `.env` file

```env
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/mini_crm
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

#### Setup Database

```bash
psql -U postgres
CREATE DATABASE mini_crm;
\q

psql -U postgres -d mini_crm -f database/schema.sql
```

#### Start Backend Server

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

#### Create `.env` file

```env
VITE_API_URL=http://localhost:5000/api
```

#### Start Frontend

```bash
npm run dev
```

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
├── backend/          # Node.js API
├── frontend/         # React application
└── README.md
```

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
