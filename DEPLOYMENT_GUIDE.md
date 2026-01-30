# 🚀 Smart Salon Deployment Guide

This guide will help you deploy your MERN stack application to the cloud for free.

## 🏗️ Architecture
*   **Database**: MongoDB Atlas (Cloud Database)
*   **Backend**: Render (Node.js Server)
*   **Frontend**: Vercel (React Hosting)

---

## Step 1: Push to GitHub
Ensure your latest code is on GitHub (we just did this).

## Step 2: Setup Database (MongoDB Atlas)
1.  Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up.
2.  Create a **FREE** cluster (Shared).
3.  **Network Access**: Allow access from anywhere (`0.0.0.0/0`).
4.  **Database Access**: Create a user (e.g., `admin`) and password.
5.  **Connect**: Get your connection string. It looks like:
    `mongodb+srv://admin:<password>@cluster0.abcde.mongodb.net/smart-salon?retryWrites=true&w=majority`
6.  Save this string!

## Step 3: Deploy Backend (Render)
1.  Go to [Render.com](https://render.com) and sign up with GitHub.
2.  Click **New +** -> **Web Service**.
3.  Connect your `smart-salon-mini-project` repository.
4.  **Settings**:
    *   **Root Directory**: `backend`
    *   **Build Command**: `npm install && npm run build` (or just `npm install` if no build script)
    *   **Start Command**: `npx tsx src/server.ts`
5.  **Environment Variables** (Add these):
    *   `MONGO_URI`: (Paste your MongoDB connection string from Step 2)
    *   `PORT`: `10000` (Render creates this automatically usually)
6.  Click **Deploy**.
7.  Once live, copy your Backend URL (e.g., `https://smart-salon-backend.onrender.com`).

## Step 4: Deploy Frontend (Vercel)
1.  Go to [Vercel.com](https://vercel.com) and sign up with GitHub.
2.  Click **Add New...** -> **Project**.
3.  Import `smart-salon-mini-project`.
4.  **Framework Preset**: Vite.
5.  **Root Directory**: Click "Edit" and select `frontend`.
6.  **Environment Variables**:
    *   `VITE_API_URL`: (Paste your Render Backend URL + `/api`)
        *   Example: `https://smart-salon-backend.onrender.com/api`
7.  Click **Deploy**.

## 🔄 Updates & Redeployment
*   Because we linked GitHub, **whenever you push code to GitHub (`git push`), Render and Vercel will AUTOMATICALLY redeploy your site!**
*   You don't need to do anything manually. Just push and wait 2-3 minutes.
