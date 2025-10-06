import { createBrowserRouter, Navigate } from 'react-router-dom';

// routes
import AuthenticationRoutes from './AuthenticationRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter(
  [
    // Redirect from root to login
    {
      path: '/',
      element: <Navigate to="/pages/login" replace />
    },
    AuthenticationRoutes,
    MainRoutes
  ],
  {
    basename: import.meta.env.VITE_APP_BASE_NAME // '/admin' from .env
  }
);

export default router;
