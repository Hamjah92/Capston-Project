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
import { usePurchase } from 'src/hooks/myHooks/database/usePurchase';
import { GetPurchaseType } from 'src/@types/purchase';
import { PurchaseViewPage } from './components/PurchaseViewPage';
//

// ----------------------------------------------------------------------

export default function PurchaseView() {
  const settings = useSettingsContext();

  const { purchaseId } = useParams();

  const { getPurchaseById } = usePurchase();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: [`purchase/${purchaseId}`],
    queryFn: async () => getPurchaseById(purchaseId!),
    initialData: null,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [`purchase/${purchaseId}`] });
  }, [purchaseId, queryClient]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={data?.purchaseId}
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Invoice',
            href: paths.dashboard.purchase.root,
          },
          { name: data?.purchaseId },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {data && <PurchaseViewPage purchase={data as GetPurchaseType} />}
    </Container>
  );
}
