import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './utils/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
/**
 * PROTECTED ROUTE GUARD
 * Zero-Knowledge setup:
 * If the cryptoKey is gone (page refresh), they MUST re-login.
 */
const ProtectedRoute = () => {
  const { isAuthenticated, cryptoKey } = useAuth();

  // For Session-based auth, check the global AuthState.
  // If the user refreshed, cryptoKey (in RAM) will be null.
  if (!isAuthenticated || !cryptoKey) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; 
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />, 
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}