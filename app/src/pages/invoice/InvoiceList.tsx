import { Button, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { useMemo } from 'react';
import { RTTable } from 'src/my-components/react-table/RTTable';
import { useInvoice } from 'src/hooks/myHooks/database/useInvoice';
import { invoiceCols } from './helper/invoice.col';

type Props = {};

const InvoiceList = (props: Props) => {
  const { themeStretch } = useSettingsContext();
  const { deleteMany, invoiceQuery } = useInvoice();

  const { data } = invoiceQuery;
  const tableColumns = useMemo(() => invoiceCols, []);

  return (
    <>
      <Helmet>
        <title> Invoice List</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="invoice List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'invoice', href: paths.dashboard.invoice.root },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={paths.dashboard.invoice.add}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New invoice
            </Button>
          }
        />
        <RTTable
          tableCols={tableColumns}
          tableData={data as object[]}
          handleDeleteSelectedRows={deleteMany}
        />
      </Container>
    </>
  );
};

export default InvoiceList;
