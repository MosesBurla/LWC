import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Registration from './pages/Registration'
import Groups from './pages/Groups'
import GroupDetail from './pages/GroupDetail'
import Events from './pages/Events'
import Posts from './pages/Posts'
import Devotionals from './pages/Devotionals'
import PrayerRequests from './pages/PrayerRequests'
import AdminDashboard from './pages/AdminDashboard'
import AdminSetup from './pages/AdminSetup'
import Profile from './pages/Profile'
import { ProtectedRoute } from './components/ui/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
  {
    path: '/admin-setup',
    element: <AdminSetup />,
  },
  {
    path: '/groups',
    element: (
      <ProtectedRoute>
        <Groups />
      </ProtectedRoute>
    ),
  },
  {
    path: '/groups/:id',
    element: (
      <ProtectedRoute>
        <GroupDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: '/events',
    element: (
      <ProtectedRoute>
        <Events />
      </ProtectedRoute>
    ),
  },
  {
    path: '/posts',
    element: (
      <ProtectedRoute>
        <Posts />
      </ProtectedRoute>
    ),
  },
  {
    path: '/devotionals',
    element: <Devotionals />,
  },
  {
    path: '/prayer-requests',
    element: (
      <ProtectedRoute>
        <PrayerRequests />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin',
    element: <AdminDashboard />,
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
])