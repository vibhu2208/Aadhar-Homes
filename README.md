# Aadhar Homes - Real Estate Management System

A full-stack web application for managing real estate properties with admin authentication and modern UI.

## 🚀 Features

### Phase 1 ✅ (Completed)
- **Backend Setup**
  - Node.js + Express server
  - MongoDB connection with Mongoose
  - Environment configuration
  - RESTful API structure
  - Error handling middleware

- **Frontend Setup**
  - React 18 with Vite
  - TailwindCSS for styling
  - React Router for navigation
  - Responsive design
  - Modern UI components

### Phase 2 ✅ (Completed)
- **Authentication System**
  - JWT-based authentication
  - Secure password hashing (bcrypt)
  - Admin user registration/login
  - Protected routes
  - Token-based session management

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcryptjs
- **Environment**: dotenv
- **CORS**: cors middleware

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **State Management**: React Hooks

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Aadhar-Homes
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aadhar-homes
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=30d
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🔐 Authentication Flow

1. **First Time Setup**: Register the first admin user
2. **Login**: Use email/password to authenticate
3. **JWT Token**: Stored in localStorage for session management
4. **Protected Routes**: Dashboard requires authentication
5. **Auto-redirect**: Unauthenticated users redirected to login

## 📁 Project Structure

```
Aadhar-Homes/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── authController.js     # Authentication logic
│   ├── middleware/
│   │   └── auth.js              # JWT middleware
│   ├── models/
│   │   └── User.js              # User model
│   ├── routes/
│   │   └── auth.js              # Auth routes
│   ├── .env                     # Environment variables
│   ├── package.json
│   └── server.js                # Express server
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── pages/
│   │   │   ├── Login.jsx        # Login/Register page
│   │   │   └── Dashboard.jsx    # Admin dashboard
│   │   ├── services/
│   │   │   └── authService.js   # API service layer
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # TailwindCSS styles
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new admin user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/logout` - Logout user

### System
- `GET /api/test` - Test API connection
- `GET /api/health` - Health check

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Interface**: Clean, professional design with TailwindCSS
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Form Validation**: Client-side and server-side validation

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for secure cross-origin requests
- **Environment Variables**: Sensitive data in environment files

## 🚀 Getting Started

1. **Install Dependencies**: Run `npm install` in both backend and frontend directories
2. **Setup Database**: Ensure MongoDB is running
3. **Configure Environment**: Update `.env` file with your settings
4. **Start Servers**: Run both backend and frontend development servers
5. **Create Admin**: Register your first admin user
6. **Access Dashboard**: Login and explore the admin interface

## 📝 Next Steps (Future Phases)

- Property management (CRUD operations)
- Image upload and gallery
- Search and filtering
- User inquiries management
- Email notifications
- Advanced reporting
- Mobile app integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

---

## 🎉 Phase 3 & 4 Complete!

### ✅ Phase 3: Project CRUD (Complete)
**Backend:**
- ✅ Project model with comprehensive schema
- ✅ Full CRUD API endpoints with authentication
- ✅ Advanced filtering (city, type, status, price range, builder)
- ✅ Text search with MongoDB indexes and scoring
- ✅ Pagination and sorting capabilities
- ✅ Project statistics for admin dashboard

**Frontend:**
- ✅ Public projects listing page with filters and search
- ✅ Detailed project view page with image gallery
- ✅ Admin projects management in dashboard
- ✅ Responsive design with loading states

### ✅ Phase 4: New Launch CRUD (Complete)
**Backend:**
- ✅ NewLaunch model with launch-specific fields
- ✅ Full CRUD API endpoints
- ✅ Upcoming launches endpoint
- ✅ Launch-specific filtering and search
- ✅ Priority-based sorting
- ✅ NewLaunch statistics

**Frontend:**
- ✅ Admin new launches management
- ✅ Comprehensive admin dashboard with tabs
- ✅ Statistics overview and quick actions
- ✅ Table views for managing both projects and launches

## 🔗 Application Routes

### Public Routes
- `/` - Redirects to projects listing
- `/projects` - Browse all properties with filters
- `/projects/:id` - Detailed project view
- `/login` - Admin authentication

### Protected Routes (Admin Only)
- `/admin` - Admin dashboard with overview
- `/admin` (Projects tab) - Manage all projects
- `/admin` (New Launches tab) - Manage new launches

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - Register admin (first user or admin-protected)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Projects
- `GET /api/projects` - List projects (public, with filters)
- `GET /api/projects/search` - Search projects (public)
- `GET /api/projects/:id` - Get project details (public)
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)
- `GET /api/projects/admin/stats` - Project statistics (admin)

### New Launches
- `GET /api/newlaunch` - List new launches (public)
- `GET /api/newlaunch/search` - Search new launches (public)
- `GET /api/newlaunch/upcoming` - Upcoming launches (public)
- `GET /api/newlaunch/:id` - Get new launch details (public)
- `POST /api/newlaunch` - Create new launch (admin)
- `PUT /api/newlaunch/:id` - Update new launch (admin)
- `DELETE /api/newlaunch/:id` - Delete new launch (admin)
- `GET /api/newlaunch/admin/stats` - New launch statistics (admin)

## 🎯 Key Features Implemented

### Advanced Filtering & Search
- **Location-based**: Filter by city, state
- **Property type**: Apartment, Villa, Plot, Commercial
- **Price range**: Min/max price filtering
- **Status**: Under Construction, Ready to Move, etc.
- **Builder**: Filter by developer/builder name
- **Full-text search**: Powered by MongoDB text indexes

### Admin Dashboard
- **Overview tab**: Statistics, recent activity, quick actions
- **Projects management**: Full CRUD with table view
- **New launches management**: Launch-specific features
- **Real-time data**: API status monitoring
- **Responsive design**: Works on all devices

### Data Models
- **Comprehensive schemas**: BHK details, amenities, highlights
- **Image support**: Multiple image fields with CDN URLs
- **Location data**: Connectivity, entertainment, business hubs
- **Pricing**: Flexible pricing with ranges
- **Launch management**: Pre-booking, early bird discounts

## 🔧 Technical Highlights

- **Security**: JWT authentication, role-based access
- **Performance**: Database indexing, pagination, caching-ready
- **Validation**: Server-side validation with meaningful errors
- **Error handling**: Comprehensive error responses
- **Code organization**: Modular structure, separation of concerns
- **Modern UI**: TailwindCSS, responsive design, loading states

## 🚀 Ready for Production

The application now has:
- ✅ Complete authentication system
- ✅ Full project and new launch management
- ✅ Public-facing property listings
- ✅ Admin dashboard for content management
- ✅ Search and filtering capabilities
- ✅ Responsive design for all devices
- ✅ Production-ready API structure

**Status**: Phase 1, 2, 3 & 4 Complete ✅
**Next**: Ready for image upload, email notifications, and advanced features!
