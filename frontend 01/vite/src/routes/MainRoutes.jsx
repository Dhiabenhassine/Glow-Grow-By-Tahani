import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Categories')));
const UtilsPacks = Loadable(lazy(() => import('views/utilities/Packs')));
const UtilsCourses = Loadable(lazy(() => import('views/utilities/Courses')));
const UtilsLessons = Loadable(lazy(() => import('views/utilities/Lessons')));
const UtilsPromo = Loadable(lazy(() => import('views/utilities/Promo')));
const UtilsHealthy = Loadable(lazy(() => import('views/utilities/Healthy')));
// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'Categories',
      element: <UtilsTypography />
    },
    {
      path: 'Packs',
      element: <UtilsPacks />
    },
    {
      path: 'Courses',
      element: <UtilsCourses />
    },
     {
      path: 'Lessons',
      element: <UtilsLessons />
    },
     {
      path: 'Promo',
      element: <UtilsPromo />
    },
    
     {
      path: 'healthy',
      element: <UtilsHealthy />
    },
    {
      path: '/sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
