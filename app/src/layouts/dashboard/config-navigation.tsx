import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// components
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  customer: icon('ic_customer'),
  purchase: icon('ic_purchase'),
  tax: icon('ic_tax'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: 'Actions',
        items: [
          { title: 'Dashboard', path: paths.dashboard.root, icon: ICONS.dashboard },
          {
            title: 'Customer',
            path: paths.dashboard.customer.root,
            icon: ICONS.customer,
            children: [
              { title: 'list', path: paths.dashboard.customer.list },
              { title: 'Add', path: paths.dashboard.customer.add },
            ],
          },
          {
            title: 'Product',
            path: paths.dashboard.product.root,
            icon: ICONS.product,
            children: [
              { title: 'list', path: paths.dashboard.product.list },
              { title: 'Add', path: paths.dashboard.product.add },
            ],
          },
          {
            title: 'Invoice',
            path: paths.dashboard.invoice.root,
            icon: ICONS.invoice,
            children: [
              { title: 'list', path: paths.dashboard.invoice.list },
              { title: 'Add', path: paths.dashboard.invoice.add },
            ],
          },
          {
            title: 'Supplier',
            path: paths.dashboard.supplier.root,
            icon: ICONS.order,
            children: [
              { title: 'list', path: paths.dashboard.supplier.list },
              { title: 'Add', path: paths.dashboard.supplier.add },
            ],
          },
          {
            title: 'Purchase',
            path: paths.dashboard.purchase.root,
            icon: ICONS.purchase,
            children: [
              { title: 'list', path: paths.dashboard.purchase.list },
              { title: 'Add', path: paths.dashboard.purchase.add },
            ],
          },
        ],
      },
      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: 'Setting',
        items: [
          {
            title: 'user',
            path: paths.dashboard.user.root,
            icon: ICONS.user,
            children: [
              { title: 'list', path: paths.dashboard.user.root },
              { title: 'Add', path: paths.dashboard.user.add },
            ],
          },
          {
            title: 'Tax',
            path: paths.dashboard.tax.root,
            icon: ICONS.tax,
            children: [
              { title: 'list', path: paths.dashboard.tax.root },
              { title: 'Add', path: paths.dashboard.tax.add },
            ],
          },
        ],
      },
    ],
    []
  );

  return data;
}
