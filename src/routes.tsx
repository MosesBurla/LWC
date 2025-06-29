import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Groups from './pages/Groups'
import GroupDetail from './pages/GroupDetail'
import Events from './pages/Events'
import Posts from './pages/Posts'
import Devotionals from './pages/Devotionals'
import PrayerRequests from './pages/PrayerRequests'
import AdminDashboard from './pages/AdminDashboard'
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
    path: '/registration',
    element: <Registration />,
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
    element: (
      <ProtectedRoute requireAdmin>
        <AdminDashboard />
      </ProtectedRoute>
    ),
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