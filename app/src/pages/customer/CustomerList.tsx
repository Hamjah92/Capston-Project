import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { Button, Container } from '@mui/material';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RTTable } from 'src/my-components/react-table/RTTable';
import { useSettingsContext } from 'src/components/settings';
import { useCustomer } from 'src/hooks/myHooks/database/useCustomer';
import { customerCols } from './helper/customer.col';

const CustomerList = () => {
  const { getAllCustomers, deleteMany } = useCustomer();
  const tableColumns = useMemo(() => customerCols, []);

  const { data } = useQuery({
    queryKey: ['customers'],
    queryFn: getAllCustomers,
    initialData: [],
    refetchOnWindowFocus: false,
  });

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Customer List | SMTEg</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="User List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Customers', href: paths.dashboard.customer.root },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={paths.dashboard.customer.add}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Customer
            </Button>
          }
        />
        <RTTable
          tableCols={tableColumns}
          tableData={data as object[]}
          handleDeleteSelectedRows={deleteMany}
        />
        ;
      </Container>
    </>
  );
};

export default CustomerList;
