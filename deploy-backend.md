# 🚀 Backend Deployment Guide (Railway)

## Step 1: Deploy Backend to Railway

1. **Go to [Railway.app](https://railway.app)**
2. **Sign in** with your GitHub account
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository**: `bhavanishankera7/todo-list-app`
6. **Set Root Directory** to: `backend`
7. **Click "Deploy"**

## Step 2: Add PostgreSQL Database

1. **In your Railway project dashboard**
2. **Click "New"** → **"Database"** → **"PostgreSQL"**
3. **Wait for the database to be created**

## Step 3: Configure Environment Variables

1. **Go to your project settings**
2. **Click "Variables" tab**
3. **Add these environment variables**:

```
DB_HOST=your-postgres-host.railway.app
DB_PORT=5432
DB_NAME=railway
DB_USER=postgres
DB_PASSWORD=your-postgres-password
PORT=3001
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
BCRYPT_ROUNDS=12
```

4. **Get the database credentials** from the PostgreSQL service in your Railway dashboard

## Step 4: Deploy

1. **Railway will automatically deploy** when you push to GitHub
2. **Wait for deployment to complete**
3. **Copy your backend URL** (e.g., `https://your-app.railway.app`)

## Step 5: Test Backend

Test your deployed backend:
```bash
curl https://your-app.railway.app/health
```

You should see: `{"status":"OK","timestamp":"...","uptime":...}` 