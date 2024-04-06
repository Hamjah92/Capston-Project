import { useEffect } from 'react';
// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// _mock
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useParams } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GetInvoiceType } from 'src/@types/invoice';
import { useInvoice } from 'src/hooks/myHooks/database/useInvoice';
import { InvoiceViewPage } from './components/InvoiceViewPage';
//

// ----------------------------------------------------------------------

export default function InvoiceView() {
  const settings = useSettingsContext();

  const { invoiceId } = useParams();

  const { getInvoiceById } = useInvoice();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: [`invoice/${invoiceId}`],
    queryFn: async () => getInvoiceById(invoiceId!),
    initialData: null,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [`invoice/${invoiceId}`] });
  }, [invoiceId, queryClient]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={data?.invoiceId}
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Invoice',
            href: paths.dashboard.invoice.root,
          },
          { name: data?.invoiceId },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {data && <InvoiceViewPage invoice={data as GetInvoiceType} />}
    </Container>
  );
}
