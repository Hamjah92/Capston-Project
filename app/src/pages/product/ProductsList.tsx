import { Button, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { RTTable } from 'src/my-components/react-table/RTTable';
import { useProduct } from 'src/hooks/myHooks/database/useProduct';
import { productCols } from './helper/product.col';

type Props = {};

const ProductsList = (props: Props) => {
  const { themeStretch } = useSettingsContext();
  const { getAllProducts, deleteMany } = useProduct();

  const tableColumns = useMemo(() => productCols, []);

  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
    initialData: [],
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Helmet>
        <title>Products List</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="product List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'product', href: paths.dashboard.product.root },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={paths.dashboard.product.add}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New product
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

export default ProductsList;
