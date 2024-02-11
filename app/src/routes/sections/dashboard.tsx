import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/Dashboard'));

// customer

const CustomerList = lazy(() => import('src/pages/customer/CustomerList'));
const AddCustomer = lazy(() => import('src/pages/customer/AddCustomer'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'customer',
        children: [
          { element: <CustomerList />, index: true },
          { path: 'list', element: <CustomerList /> },
          { path: 'Add', element: <AddCustomer /> },
        ],
      },
    ],
  },
];
