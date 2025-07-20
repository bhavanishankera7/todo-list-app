# To-Do List Frontend

A modern, responsive React frontend for the To-Do List Web Application.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Authentication**: User registration and login with JWT
- **Todo Management**: Complete CRUD operations for todos
- **Real-time Updates**: Instant UI updates with optimistic rendering
- **Status Management**: Track todo progress (pending, in progress, completed)
- **Priority Levels**: Low, medium, and high priority todos
- **Due Dates**: Set and track due dates for todos
- **Filtering**: Filter todos by status
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for API communication
- **Context API** for state management

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── Login.tsx       # Login form
│   │   ├── Register.tsx    # Registration form
│   │   ├── Dashboard.tsx   # Main dashboard
│   │   ├── TodoItem.tsx    # Individual todo item
│   │   └── CreateTodoModal.tsx # Create todo modal
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx # Authentication context
│   ├── services/           # API services
│   │   └── api.ts         # API communication
│   ├── types/              # TypeScript types
│   │   └── index.ts       # Type definitions
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Backend server running on port 3001

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🔧 Configuration

### API Configuration

The frontend connects to the backend API at `http://localhost:3001`. You can modify the API base URL in `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://localhost:3001';
```

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:3001
```

## 📱 Features Overview

### Authentication
- **Login**: Email and password authentication
- **Register**: User registration with validation
- **JWT Tokens**: Secure authentication with automatic token management
- **Protected Routes**: Automatic redirection for unauthenticated users

### Todo Management
- **Create**: Add new todos with title, description, priority, and due date
- **Read**: View all todos with filtering and sorting
- **Update**: Edit todo details inline
- **Delete**: Remove todos with confirmation
- **Status Updates**: Change todo status (pending → in progress → completed)

### UI Features
- **Responsive Design**: Works on all screen sizes
- **Dark/Light Mode**: Modern color scheme
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time validation feedback

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Gray Scale**: Various shades for text and backgrounds

### Components
- **Cards**: Clean, elevated containers
- **Buttons**: Consistent button styles with hover states
- **Forms**: Styled form inputs with focus states
- **Modals**: Overlay dialogs for actions
- **Icons**: Lucide React icons throughout

## 🔌 API Integration

The frontend integrates with the backend API endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Todos
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `PATCH /api/todos/:id/status` - Update todo status
- `DELETE /api/todos/:id` - Delete todo

## 🧪 Testing

The frontend includes comprehensive error handling and validation:

- **Form Validation**: Client-side validation for all forms
- **API Error Handling**: Graceful handling of API errors
- **Loading States**: User feedback during async operations
- **Authentication**: Automatic token refresh and logout

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy Options

1. **Vercel**: Connect your GitHub repository
2. **Netlify**: Drag and drop the `dist` folder
3. **AWS S3**: Upload the `dist` folder to S3
4. **Docker**: Use the provided Dockerfile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue on GitHub or contact the development team. 