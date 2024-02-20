import { Button, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { useQuery } from '@tanstack/react-query';
import { useSupplier } from 'src/hooks/myHooks/database/useSupplier';
import { useMemo } from 'react';
import { RTTable } from 'src/my-components/react-table/RTTable';
import { supplierCols } from './helper/supplier.col';

type Props = {};

const SupplierList = (props: Props) => {
  const { themeStretch } = useSettingsContext();
  const { getAllSuppliers, deleteMany } = useSupplier();

  const tableColumns = useMemo(() => supplierCols, []);

  const { data } = useQuery({
    queryKey: ['suppliers'],
    queryFn: getAllSuppliers,
    initialData: [],
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Helmet>
        <title> Supplier List</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Supplier List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Supplier', href: paths.dashboard.supplier.root },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={paths.dashboard.supplier.add}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Supplier
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

export default SupplierList;
