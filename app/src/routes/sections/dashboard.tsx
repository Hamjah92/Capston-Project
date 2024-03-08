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

// tax

const AddTaxSlab = lazy(() => import('src/pages/settings/tax/AddTaxSlab'));
const TaxSlabLIst = lazy(() => import('src/pages/settings/tax/TaxSlabLIst'));

// product
const ProductsList = lazy(() => import('src/pages/product/ProductsList'));
const AddProduct = lazy(() => import('src/pages/product/AddProduct'));

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
          { path: 'add', element: <AddCustomer /> },
          { path: 'edit/:customerId', element: <EditCustomer /> },
        ],
      },
      {
        path: 'product',
        children: [
          { element: <ProductsList />, index: true },
          { path: 'list', element: <ProductsList /> },
          { path: 'add', element: <AddProduct /> },
          // { path: 'edit/:productId', element: <EditCustomer /> },
        ],
      },
      {
        path: 'supplier',
        children: [
          { element: <SupplierList />, index: true },
          { path: 'list', element: <SupplierList /> },
          { path: 'add', element: <AddSupplier /> },
          { path: 'edit/:supplierId', element: <EditSupplier /> },
        ],
      },
      {
        path: 'tax',
        children: [
          { element: <TaxSlabLIst />, index: true },
          { path: 'list', element: <TaxSlabLIst /> },
          { path: 'add', element: <AddTaxSlab /> },
          // { path: 'edit/:supplierId', element: <EditSupplier /> },
        ],
      },
    ],
  },
];
