# ✨ Smart Salon Management System

> An AI-Powered, Full-Stack setup to revolutionize Salon Operations.
> Built with the **MERN Stack** (MongoDB, Express, React, Node.js).

## 🚀 Live Demo & Deployment
*   **Deployment Guide**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for instructions on how to deploy this project for free using Render and Vercel.

## 🌟 Key Features

### 1. 📅 Smart Appointment Booking
*   **Customer-Facing UI**: Beautiful "Glassmorphism" design.
*   **Conflict Detection**: Automatically prevents double-booking using backend logic.
*   **Interactive Time Selector**: Pill-based grid for easy slot selection.

### 2. ✂️ Workforce Management
*   **Skill-Based Categorization**: Experts, Intermediates, and Juniors.
*   **Efficiency Scores**: Track stylist performance.
*   **Visual Data**: Badges and Color-coded proficiency levels.

### 3. 📦 Intelligent Inventory
*   **Real-time Tracking**: Monitor stock levels of shampoos, dyes, etc.
*   **Expiry Alerts**: Warning badges for items nearing expiry.
*   **Low Stock Indicators**: Automated "Reorder Soon" flags.

### 4. 🧠 AI & Analytics Dashboard
*   **Demand Forecasting**: Predicts surge days (e.g., "40% jump this weekend").
*   **Churn Prediction**: Identifies customers at risk of leaving.
*   **Visual Charts**: Interactive Line & Pie charts for actionable insights.

---

## 🛠️ Technology Stack

### Frontend
*   **Framework**: React (Vite)
*   **Styling**: Tailwind CSS (Glassmorphism, Gradients)
*   **Icons**: Lucide React
*   **Charts**: Recharts
*   **State**: React Hooks (useState, useEffect)

### Backend
*   **Server**: Node.js & Express
*   **Database**: MongoDB Atlas (Cloud)
*   **Validation**: Zod (Schema validation)
*   **Language**: TypeScript (Full type safety)

---

## 🏃‍♂️ Getting Started (Local Development)

### Prerequisites
*   Node.js installed.
*   A MongoDB Atlas Connection String (see Deployment Guide).

### 1. Backend Setup
```bash
cd backend
# Create .env file with: PORT=5001 and MONGO_URI=...
npm install
npx tsx src/server.ts
```
*   *Optional**: Run `npx tsx src/seed.ts` to populate the database with demo data.*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Project Structure
*   `/frontend`: React UI code.
*   `/backend`: API server and Database models.
*   `/DEPLOYMENT_GUIDE.md`: Step-by-step cloud deployment instructions.
*   `/FRONTEND_STATUS.md`: Detailed breakdown of UI components.
