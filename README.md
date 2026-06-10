# CodeShare - Social Code Sharing Platform

A modern, full-stack web application for developers to share, explore, and collaborate on code snippets and projects. Built with React, Firebase, and Tailwind CSS.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Components Overview](#components-overview)
- [Authentication](#authentication)
- [Database](#database)
- [Contributing](#contributing)

## 🎯 Overview

CodeShare is a vibrant community platform designed for developers to share their code snippets, projects, and technical knowledge. Users can create posts, explore other developers' work, build their profiles, and connect with the coding community through a clean, intuitive interface.

## ✨ Features

### Core Features

- **User Authentication**
  - Email/Password registration and login
  - Google OAuth integration
  - Secure password reset functionality
  - Profile management

- **Post Management**
  - Create and share code posts with title, description, and tags
  - Image upload with automatic compression
  - Browse posts with pagination
  - Search posts by keywords
  - Sort posts (newest, popular)
  - Filter by tags and date
  - View detailed post information

- **User Profiles**
  - Customizable user profiles
  - Display user skills and information
  - View user's posted content
  - Profile header and detailed information sections

- **Community Features**
  - Explore all shared code posts
  - Contact page for direct communication
  - About page with project information
  - Help & FAQ sections
  - Interactive UI with animations

- **User Experience**
  - Dark/Light theme toggle
  - Loading skeletons for better UX
  - Confetti animations for celebrations
  - Responsive design with Tailwind CSS
  - Form validation with React Hook Form
  - Toast notifications with SweetAlert2

## 🛠 Tech Stack

### Frontend

- **React 19.2.4** - UI library
- **Vite 8.0.1** - Build tool and dev server
- **React Router 7.13.2** - Client-side routing
- **React Hook Form 7.72.1** - Form state management
- **Framer Motion 12.38.0** - Animation library
- **Tailwind CSS 4.2.2** - Utility-first CSS framework
- **DaisyUI 5.5.19** - Tailwind component library
- **Lucide React & React Icons** - Icon libraries

### Backend & Services

- **Firebase**
  - Authentication (Email/Password, Google OAuth)
  - Firestore (NoSQL database)
  - Analytics
- **Axios 1.15.0** - HTTP client for API requests
- **EmailJS** - Email sending functionality

### Utilities

- **browser-image-compression 2.0.2** - Client-side image optimization
- **canvas-confetti 1.9.4** - Confetti animations
- **SweetAlert2 11.26.24** - Beautiful alert dialogs

### Development Tools

- **ESLint 9.39.4** - Code quality and linting
- **Vite React Plugin** - React fast refresh support
- **Tailwind CSS Vite** - Vite integration for Tailwind

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Firebase account and project

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd codeshare
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables** (see [Environment Setup](#environment-setup))

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🔐 Environment Setup

Create a `.env.local` file in the project root with your Firebase configuration:

```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
VITE_measurementId=your_firebase_measurement_id
```

### Firebase Setup Instructions

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication (Email/Password and Google OAuth)
3. Create a Firestore database
4. Copy your web app credentials to `.env.local`

## 📁 Project Structure

```
codeshare/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── About/          # About page component
│   │   ├── CardSkeleton/   # Loading skeleton component
│   │   ├── Contacts/       # Contact component
│   │   ├── Footer/         # Footer component
│   │   ├── Help/           # Help and FAQ components
│   │   ├── Navbar/         # Navigation bar
│   │   ├── PostCard/       # Individual post card display
│   │   └── PostDetails/    # Post details view
│   ├── context/            # React Context for state management
│   │   └── AuthContext/    # Authentication context and provider
│   ├── Firebase/           # Firebase configuration
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.jsx     # Authentication hook
│   │   └── useAxiosSecure.jsx # Secure axios instance hook
│   ├── pages/              # Page components (route destinations)
│   │   ├── CreatePost/     # Create new post page
│   │   ├── Home/           # Home/feed page
│   │   ├── Login/          # Login page
│   │   ├── Logout/         # Logout handler
│   │   ├── NotFound/       # 404 error page
│   │   ├── Profile/        # User profile page
│   │   └── Register/       # Registration page
│   ├── routes/             # React Router configuration
│   ├── Theme/              # Theme toggle component
│   ├── App.jsx             # Main App component
│   ├── main.jsx            # Application entry point
│   ├── App.css             # App styles
│   └── index.css           # Global styles
├── public/                 # Static assets
├── eslint.config.js        # ESLint configuration
├── vite.config.js          # Vite configuration
├── package.json            # Project dependencies
└── README.md              # This file
```

## 🚀 Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server with hot module replacement (HMR).

### Build

```bash
npm run build
```

Creates an optimized production build in the `dist/` directory.

### Preview

```bash
npm run preview
```

Serves the production build locally for preview.

### Linting

```bash
npm run lint
```

Runs ESLint to check code quality and style issues.

## 🧩 Components Overview

### Pages

- **Home** - Main feed displaying all posts with search, sort, and filter capabilities
- **CreatePost** - Form to create and publish new code snippets
- **Profile** - User profile with skills, information, and posted content
- **Login** - Email/password and Google OAuth login
- **Register** - User registration form
- **Help** - Help center with FAQ sections
- **About** - Information about the platform
- **NotFound** - 404 error page

### Components

- **Navbar** - Navigation header with links and user menu
- **Footer** - Application footer
- **PostCard** - Displays individual post preview
- **PostDetails** - Full post view with metadata
- **CardSkeleton** - Loading state placeholder
- **ThemeToggle** - Dark/light mode switcher

## 🔑 Authentication

### Firebase Auth Integration

- Users can register with email and password
- Google OAuth login support
- Password reset functionality via email
- Secure user sessions with Firebase
- User profile management (name, photo, etc.)

### Protected Routes

- Create post requires authentication
- Profile page requires authentication
- Uses `useAuth` hook for access control

## 💾 Database

### Firestore Collections

- **posts** - Stores all shared code posts
  - title, description, tags, image, author, timestamp, etc.
- **users** - User profile information
  - name, email, skills, bio, etc.

### Data Flow

- Posts are fetched using Axios with secure headers
- Pagination implemented on the backend
- Search and filter queries processed server-side

## 🎨 Styling

- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Pre-built components and themes
- **Dark/Light mode support** - Theme toggle available
- **Responsive design** - Mobile-first approach
- **Custom animations** - Framer Motion for smooth transitions

## 🚀 Getting Started

1. Install dependencies: `npm install`
2. Configure Firebase credentials in `.env.local`
3. Run development server: `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173) in your browser
5. Create an account or sign in with Google
6. Start creating and sharing code!

## 📝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support

For issues, questions, or suggestions, please open an issue on the repository or contact through the CodeShare contact page.

---

**Happy Coding! 🚀**
