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
const EditTaxSlab = lazy(() => import('src/pages/settings/tax/EditTaxSlab'));
const TaxSlabLIst = lazy(() => import('src/pages/settings/tax/TaxSlabLIst'));

// product
const ProductsList = lazy(() => import('src/pages/product/ProductsList'));
const AddProduct = lazy(() => import('src/pages/product/AddProduct'));
const EditProduct = lazy(() => import('src/pages/product/EditProduct'));

// purchase

const AddPurchase = lazy(() => import('src/pages/purchase/AddPurchase'));
const EditPurchase = lazy(() => import('src/pages/purchase/EditPurchase'));
const PurchaseList = lazy(() => import('src/pages/purchase/PurchaseList'));
const PurchaseView = lazy(() => import('src/pages/purchase/PurchaseView'));

// invoice
const InvoiceList = lazy(() => import('src/pages/invoice/InvoiceList'));
const AddInvoice = lazy(() => import('src/pages/invoice/AddInvoice'));
const EditInvoice = lazy(() => import('src/pages/invoice/EditInvoice'));
const InvoiceView = lazy(() => import('src/pages/invoice/InvoiceView'));

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
        path: 'invoice',
        children: [
          { element: <InvoiceList />, index: true },
          { path: 'list', element: <InvoiceList /> },
          { path: 'add', element: <AddInvoice /> },
          { path: 'edit/:invoiceId', element: <EditInvoice /> },
          { path: 'view/:invoiceId', element: <InvoiceView /> },
        ],
      },
      {
        path: 'product',
        children: [
          { element: <ProductsList />, index: true },
          { path: 'list', element: <ProductsList /> },
          { path: 'add', element: <AddProduct /> },
          { path: 'edit/:productId', element: <EditProduct /> },
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
        path: 'purchase',
        children: [
          { element: <PurchaseList />, index: true },
          { path: 'list', element: <PurchaseList /> },
          { path: 'add', element: <AddPurchase /> },
          { path: 'edit/:purchaseId', element: <EditPurchase /> },
          { path: 'view/:purchaseId', element: <PurchaseView /> },
        ],
      },
      {
        path: 'tax',
        children: [
          { element: <TaxSlabLIst />, index: true },
          { path: 'list', element: <TaxSlabLIst /> },
          { path: 'add', element: <AddTaxSlab /> },
          { path: 'edit/:taxId', element: <EditTaxSlab /> },
        ],
      },
    ],
  },
];
