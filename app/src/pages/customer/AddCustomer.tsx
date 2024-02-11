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
import CustomerForm from './components/CustomerForm';

// ----------------------------------------------------------------------
type Props = {};
const AddCustomer: FC<Props> = () => {
  const { themeStretch } = useSettingsContext();

  const { pathname } = useLocation();

  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  return (
    <>
      <Helmet>
        <title>Create Customer</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={!isEdit ? 'Add a new customer' : 'Edit customer'}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Customer', href: paths.dashboard.customer.root },
            { name: !isEdit ? 'New customer' : capitalCase(name) },
          ]}
        />

        <CustomerForm isEdit={isEdit} />
      </Container>
    </>
  );
};

export default AddCustomer;
