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
import { useSupplier } from 'src/hooks/myHooks/database/useSupplier';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import SupplierForm from './components/SupplierForm';

// ----------------------------------------------------------------------
type Props = {};
const EditSupplier: FC<Props> = () => {
  const { themeStretch } = useSettingsContext();

  const { pathname } = useLocation();

  const { supplierId } = useParams();

  const { getSupplierById } = useSupplier();

  const { data, isFetched } = useQuery({
    queryKey: [`suppliers/${supplierId}`],
    queryFn: async () => getSupplierById(supplierId!),
    initialData: [],
  });
  const isEdit = pathname.includes('edit');

  return (
    <>
      <Helmet>
        <title>Edit supplier</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={!isEdit ? 'Add a new supplier' : 'Edit supplier'}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'supplier', href: paths.dashboard.supplier.root },
            { name: !isEdit ? 'New supplier' : capitalCase('edit') },
          ]}
        />
        {isFetched && <SupplierForm isEdit={isEdit} currentSupplier={data.supplier} />}
      </Container>
    </>
  );
};

export default EditSupplier;
