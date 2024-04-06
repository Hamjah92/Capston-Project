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
import { useInvoice } from 'src/hooks/myHooks/database/useInvoice';
import { InvoiceForm } from './components/InvoiceForm';

// ----------------------------------------------------------------------
type Props = {};
const EditInvoice: FC<Props> = () => {
  const { themeStretch } = useSettingsContext();

  const { pathname } = useLocation();

  const { invoiceId } = useParams();

  const { getInvoiceById } = useInvoice();

  const { data, isFetched } = useQuery({
    queryKey: [`invoice/${invoiceId}`],
    queryFn: async () => getInvoiceById(invoiceId!),
    initialData: [],
    refetchOnWindowFocus: false,
  });

  const isEdit = pathname.includes('edit');

  return (
    <>
      <Helmet>
        <title>Edit invoice</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={!isEdit ? 'Add a new invoice' : 'Edit invoice'}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'invoice', href: paths.dashboard.invoice.root },
            { name: !isEdit ? 'New invoice' : capitalCase('edit') },
          ]}
        />
        {isFetched && <InvoiceForm isEdit={isEdit} currentInvoice={data} />}
      </Container>
    </>
  );
};

export default EditInvoice;
