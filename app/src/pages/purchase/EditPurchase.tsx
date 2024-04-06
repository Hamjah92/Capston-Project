import { FC } from 'react';
import { capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// @mui
import { Container } from '@mui/material';
// routes
// hooks
import { useSettingsContext } from 'src/components/settings';
// sections
import { paths } from 'src/routes/paths';
import { useQuery } from '@tanstack/react-query';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { usePurchase } from 'src/hooks/myHooks/database/usePurchase';
import { PurchaseForm } from './components/PurchaseForm';

// ----------------------------------------------------------------------
type Props = {};
const EditPurchase: FC<Props> = () => {
  const { themeStretch } = useSettingsContext();

  const { pathname } = useLocation();

  const { purchaseId } = useParams();

  const { getPurchaseById } = usePurchase();

  const { data, isFetched } = useQuery({
    queryKey: [`purchase/${purchaseId}`],
    queryFn: async () => getPurchaseById(purchaseId!),
    initialData: [],
    refetchOnWindowFocus: false,
  });

  const isEdit = pathname.includes('edit');

  console.log(data);

  return (
    <>
      <Helmet>
        <title>Edit Purchase</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={!isEdit ? 'Add a new purchase' : 'Edit purchase'}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'purchase', href: paths.dashboard.purchase.root },
            { name: !isEdit ? 'New purchase' : capitalCase('edit') },
          ]}
        />
        {isFetched && <PurchaseForm isEdit={isEdit} currentPurchase={data} />}
      </Container>
    </>
  );
};

export default EditPurchase;
