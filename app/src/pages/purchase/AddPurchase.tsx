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
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { PurchaseForm } from './components/PurchaseForm';

// ----------------------------------------------------------------------
type Props = {};
const AddPurchase: FC<Props> = () => {
  const { themeStretch } = useSettingsContext();

  const { pathname } = useLocation();

  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  return (
    <>
      <Helmet>
        <title>Create Purchase</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={!isEdit ? 'Add a new purchase' : 'Edit purchase'}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'purchase', href: paths.dashboard.purchase.root },
            { name: !isEdit ? 'New purchase' : capitalCase(name) },
          ]}
        />

        <PurchaseForm isEdit={isEdit} />
      </Container>
    </>
  );
};

export default AddPurchase;
