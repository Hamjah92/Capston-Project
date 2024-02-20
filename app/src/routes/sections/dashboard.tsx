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
const EditCustomer = lazy(() => import('src/pages/customer/EditCustomer'));

// supplier
const SupplierList = lazy(() => import('src/pages/supplier/SupplierList'));
const AddSupplier = lazy(() => import('src/pages/supplier/AddSupplier'));
const EditSupplier = lazy(() => import('src/pages/supplier/EditSupplier'));

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
          { path: 'edit/:customerId', element: <EditCustomer /> },
        ],
      },
      {
        path: 'supplier',
        children: [
          { element: <SupplierList />, index: true },
          { path: 'list', element: <SupplierList /> },
          { path: 'Add', element: <AddSupplier /> },
          { path: 'edit/:supplierId', element: <EditSupplier /> },
        ],
      },
    ],
  },
];
