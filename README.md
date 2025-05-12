# 📝 Real-time Note App

A full-stack, real-time **Note App** built with modern technologies like React (Vite), TailwindCSS, Node.js, Express.js, MQTT, Redis, and MongoDB. It allows users to add and view notes with real-time updates and infinite scroll.

## Live Link

https://fullstack-task-sonali.vercel.app/

---

## 🚀 Tech Stack

### 🔹 Frontend
- [React (Vite)](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/) – for notifications

### 🔹 Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MQTT.js](https://github.com/mqttjs/MQTT.js) – real-time messaging
- [Redis](https://redis.io/) – caching
- [MongoDB](https://www.mongodb.com/) – persistent storage

---

## 📦 Features

- ✅ Add new notes with instant UI updates  
- 🔁 Real-time sync using MQTT (publish-subscribe)  
- ⏬ Infinite scrolling to load older notes  
- ⚡ Fast performance using Redis caching  
- 🧾 REST API to fetch paginated notes  
- 🧼 Clean and modern UI with TailwindCSS  
- 💡 Responsive for all screen sizes  
- 📦 Fully type-safe using TypeScript  

---


## ⚙️ Setup Instructions

### 📦 Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Redis server
- MongoDB Atlas or local MongoDB


### 🔧 Backend Setup

**1. Navigate to backend:**

```bash
cd backend
```
**2. Install dependencies:**

```bash
npm install
```
**3. Create .env:**

PORT: '8000'
REDISPORT: '12675'
MONGO_URL: "your_mongodb_connection_string"
TASK_KEY:"your-key"
RED_URL:"your-redis-connection-string"

**4. Run the server:**

```bash
npm run dev
```
### 💻 Frontend Setup

**1. Navigate to frontend:**

```bash
cd frontend
```
**2. Install dependencies:**

```bash
npm install
```
**3. Start the frontend:**

```bash
npm run dev
```

---

## 👩‍💻 Author
**Sonali Burman**
Full Stack Developer (MERN)
sonali.b.020200@gmail.com

