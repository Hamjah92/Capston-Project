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
import SupplierForm from './components/SupplierForm';

// ----------------------------------------------------------------------
type Props = {};
const AddSupplier: FC<Props> = () => {
  const { themeStretch } = useSettingsContext();

  const { pathname } = useLocation();

  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  return (
    <>
      <Helmet>
        <title>Create supplier</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={!isEdit ? 'Add a new supplier' : 'Edit supplier'}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'supplier', href: paths.dashboard.supplier.root },
            { name: !isEdit ? 'New supplier' : capitalCase(name) },
          ]}
        />
        <SupplierForm isEdit={isEdit} />
      </Container>
    </>
  );
};

export default AddSupplier;
