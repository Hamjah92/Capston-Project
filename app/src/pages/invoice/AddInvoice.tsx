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
import { InvoiceForm } from './components/InvoiceForm';

// ----------------------------------------------------------------------
type Props = {};
const AddInvoice: FC<Props> = () => {
  const { themeStretch } = useSettingsContext();

  const { pathname } = useLocation();

  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  return (
    <>
      <Helmet>
        <title>Create Invoice</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={!isEdit ? 'Add a new invoice' : 'Edit invoice'}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Invoice', href: paths.dashboard.invoice.root },
            { name: !isEdit ? 'New Invoice' : capitalCase(name) },
          ]}
        />

        <InvoiceForm isEdit={isEdit} />
      </Container>
    </>
  );
};

export default AddInvoice;
