# To-Do List Web Application

A modern, full-stack web application for managing personal tasks and to-do items with user authentication, real-time updates, and a responsive design.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Task Management**: Create, read, update, and delete to-do items
- **Priority Levels**: Set low, medium, or high priority for tasks
- **Status Tracking**: Track task progress (pending, in progress, completed)
- **Due Dates**: Set and manage task deadlines
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Instant feedback for all user actions
- **Search & Filter**: Find and organize tasks efficiently

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js framework
- **PostgreSQL** database with Sequelize ORM
- **JWT** for authentication
- **bcrypt** for password hashing
- **Joi** for input validation
- **Helmet** for security headers
- **CORS** for cross-origin requests

### Frontend
- **React** with modern hooks
- **Vite** for fast development and building
- **React Router** for navigation
- **Axios** for API communication
- **Tailwind CSS** for styling
- **React Testing Library** for testing

### Development Tools
- **Docker** for PostgreSQL containerization
- **Git** for version control
- **Jest** for testing
- **ESLint** for code linting
- **Prettier** for code formatting

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker Desktop
- Git

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd to-do-list-web-application
```

### 2. Start PostgreSQL Database
```bash
docker-compose up -d
```

### 3. Set Up Backend
```bash
cd backend
npm install
npm run dev
```

### 4. Set Up Frontend
```bash
cd frontend
npm install
npm run dev
```

### 5. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/health

## 📁 Project Structure

```
to-do-list-web-application/
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   └── server.js       # Main server file
│   ├── package.json
│   └── .env
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   └── App.jsx
│   ├── package.json
│   └── index.html
├── docker-compose.yml      # PostgreSQL container
├── README.md
└── .gitignore
```

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=3001
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_app
DB_USER=postgres
DB_PASSWORD=password
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
BCRYPT_ROUNDS=12
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Todo Endpoints
- `GET /api/todos` - Get all todos for user
- `POST /api/todos` - Create new todo
- `GET /api/todos/:id` - Get specific todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Branching Strategy
- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features and enhancements
- `bugfix/*` - Bug fixes
- `hotfix/*` - Critical production fixes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🗺️ Roadmap

- [ ] User profile management
- [ ] Task categories and tags
- [ ] File attachments for tasks
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Dark mode theme
- [ ] Offline support
- [ ] Team collaboration features 