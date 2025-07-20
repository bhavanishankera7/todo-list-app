# 🚀 Complete Deployment Guide

## 📋 Prerequisites
- GitHub repository: `https://github.com/bhavanishankera7/todo-list-app`
- Both frontend and backend are ready for deployment

---

## 🎯 Step 1: Deploy Backend to Railway

### 1.1 Go to Railway
1. Visit [Railway.app](https://railway.app)
2. Sign in with your GitHub account
3. Click **"New Project"**

### 1.2 Connect Repository
1. Select **"Deploy from GitHub repo"**
2. Choose your repository: `bhavanishankera7/todo-list-app`
3. Set **Root Directory** to: `backend`
4. Click **"Deploy"**

### 1.3 Add PostgreSQL Database
1. In your Railway project dashboard
2. Click **"New"** → **"Database"** → **"PostgreSQL"**
3. Wait for the database to be created

### 1.4 Configure Environment Variables
1. Go to your project **Settings** → **Variables**
2. Add these environment variables:

```env
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

### 1.5 Get Backend URL
1. Wait for deployment to complete
2. Copy your backend URL (e.g., `https://your-app.railway.app`)
3. Test with: `curl https://your-app.railway.app/health`

---

## 🎯 Step 2: Deploy Frontend to Vercel

### 2.1 Go to Vercel
1. Visit [Vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click **"New Project"**

### 2.2 Import Repository
1. Select your repository: `bhavanishankera7/todo-list-app`
2. Set **Root Directory** to: `frontend`
3. Click **"Deploy"**

### 2.3 Configure Environment Variables
1. In your Vercel project dashboard
2. Go to **Settings** → **Environment Variables**
3. Add this variable:
   ```
   VITE_API_BASE_URL=https://your-railway-backend-url.railway.app
   ```
4. Replace `your-railway-backend-url` with your actual Railway backend URL

### 2.4 Redeploy Frontend
1. Go to **Deployments** tab
2. Click **"Redeploy"** to apply the environment variable

---

## 🎯 Step 3: Test Complete Application

### 3.1 Test Backend
```bash
curl https://your-backend-url.railway.app/health
```

### 3.2 Test Frontend
1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Register a new user
3. Create some todos
4. Test all CRUD operations

### 3.3 Test API Integration
```bash
# Register user
curl -X POST https://your-backend-url.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST https://your-backend-url.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

---

## 🎯 Step 4: Update Documentation

### 4.1 Update README
Add deployment URLs to your GitHub repository README:

```markdown
## 🚀 Live Demo
- **Frontend**: https://your-app.vercel.app
- **Backend API**: https://your-backend-url.railway.app
- **GitHub**: https://github.com/bhavanishankera7/todo-list-app
```

### 4.2 Update Environment Variables
Make sure your frontend is pointing to the correct backend URL.

---

## 🎯 Expected Results

After successful deployment, you'll have:

✅ **Frontend**: `https://your-app.vercel.app`
✅ **Backend**: `https://your-backend-url.railway.app`
✅ **Database**: PostgreSQL hosted on Railway
✅ **Full CRUD Operations**: Working in production
✅ **Authentication**: JWT tokens working
✅ **Real-time Updates**: UI updates immediately

---

## 🚨 Troubleshooting

### Backend Issues
- Check Railway logs for deployment errors
- Verify environment variables are set correctly
- Ensure PostgreSQL is connected

### Frontend Issues
- Check Vercel deployment logs
- Verify `VITE_API_BASE_URL` is set correctly
- Test API connectivity

### Database Issues
- Check Railway PostgreSQL connection
- Verify database credentials
- Test database migrations

---

## 🎉 Success Checklist

- [ ] Backend deployed to Railway
- [ ] Frontend deployed to Vercel
- [ ] Database connected and working
- [ ] Environment variables configured
- [ ] API endpoints responding
- [ ] Frontend connecting to backend
- [ ] User registration working
- [ ] Todo CRUD operations working
- [ ] Authentication working
- [ ] Application fully functional

**Your To-Do List application will be live and fully functional! 🚀** 