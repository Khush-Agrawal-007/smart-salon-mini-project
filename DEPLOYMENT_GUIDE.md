# 🚀 Smart Salon Deployment Guide

This guide provides step-by-step instructions to deploy your MERN stack application to the cloud for free.

---

## 🏗️ Architecture Overview
*   **Database**: MongoDB Atlas (Cloud Database)
*   **Backend**: Render (Node.js Server)
*   **Frontend**: Vercel (React Hosting)

---

## Step 1: Push to GitHub
Ensure your latest code is on GitHub. If you see your project at `https://github.com/Khush-Agrawal-007/smart-salon-mini-project`, you are ready.

---

## Step 2: Setup Database (MongoDB Atlas) 📝
*Goal: Get a database Connection String.*

1.  **Create Account**:
    *   Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and sign up (you can use Google Sign-in).
2.  **Deploy a Cluster**:
    *   Find the **"Deploy a cloud database"** page.
    *   Select **M0 Free** (the free tier option).
    *   Provider: **AWS**.
    *   Region: Choose the one closest to you (e.g., `Mumbai` or `Singapore`).
    *   Click **"Create"** (Green button at the bottom).
3.  **Security Quickstart** (Pop-up):
    *   **Username**: Type `admin`.
    *   **Password**: Type a secure password (e.g., `SalonAdmin2026`). **Write this down!**
    *   Click **"Create User"**.
4.  **Network Access** (Crucial Step):
    *   Scroll down to "Where would you like to connect from?".
    *   Select **"My Local Environment"**.
    *   Actually, to make it easier for Cloud hosting, click **"Allow Access from Anywhere"** (or manually add IP `0.0.0.0/0`).
    *   Click **"Finish and Close"**.
5.  **Get Connection String**:
    *   Go to your Dashboard (click "Database" on the left sidebar).
    *   Click the **"Connect"** button next to your Cluster name.
    *   Select **"Drivers"** (Node.js).
    *   **Copy the string**. It looks like:
        `mongodb+srv://admin:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`
    *   **Replace `<password>`** with the password you created in step 3.
    *   **Add Database Name**: Insert `/smart-salon` after `.net/` and before `?`.
        *   Final String format: `mongodb+srv://admin:SalonAdmin2026@cluster0.abcde.mongodb.net/smart-salon?retryWrites=true&w=majority`
    *   **Keep this secret string safe!**

---

## Step 3: Deploy Backend (Render) ⚙️
*Goal: Host your `server.ts` code.*

1.  **Create Account**:
    *   Go to [Render.com](https://render.com) and sign up using **GitHub**.
2.  **New Service**:
    *   Click the **"New +"** button (top right) -> Select **"Web Service"**.
    *   Under "Connect a repository", find `smart-salon-mini-project` and click **"Connect"**.
3.  **Configure Settings**:
    *   **Name**: `smart-salon-backend` (or similar).
    *   **Region**: Singapore (or nearest).
    *   **Branch**: `main`.
    *   **Root Directory**: `backend` (Important!).
    *   **Runtime**: `Node`.
    *   **Build Command**: `npm install` (or `npm install && npm run build`).
    *   **Start Command**: `npx tsx src/server.ts`
    *   **Instance Type**: Free.
4.  **Environment Variables**:
    *   Scroll down to "Environment Variables".
    *   Click **"Add Environment Variable"**.
        *   Key: `MONGO_URI` | Value: (Paste your connection string from Step 2)
        *   Key: `PORT` | Value: `10000`
5.  **Deploy**:
    *   Click **"Create Web Service"**.
    *   Wait 2-3 minutes. You should see "Live" in green.
    *   **Copy your Backend URL** from the top left (e.g., `https://smart-salon-backend.onrender.com`).

---

## Step 4: Deploy Frontend (Vercel) 🎨
*Goal: Host your React UI.*

1.  **Create Account**:
    *   Go to [Vercel.com](https://vercel.com) and sign up using **GitHub**.
2.  **Import Project**:
    *   On the dashboard, click **"Add New..."** -> **"Project"**.
    *   Find `smart-salon-mini-project` and click **"Import"**.
3.  **Configure Settings**:
    *   **Framework Preset**: It should auto-detect "Vite".
    *   **Root Directory**: **Click "Edit"** -> Select the `frontend` folder -> Click **"Continue"**.
4.  **Environment Variables**:
    *   Expand the "Environment Variables" section.
    *   Key: `VITE_API_URL`
    *   Value: (Paste your Render Backend URL from Step 3 and add `/api` at the end)
        *   Example: `https://smart-salon-backend.onrender.com/api`
5.  **Deploy**:
    *   Click **"Deploy"**.
    *   Wait ~1 minute. You will see a "Congratulations!" screen.
    *   Click the image to visit your live website!

---

## 🔄 Updates & Redeployment
*   **Automatic Updates**: Whenever you push code to GitHub (`git push`), Render and Vercel will detect it and automatically update your live site.
*   **Logs**: If something breaks, check the "Logs" tab in Render or Vercel dashboard to see errors.
