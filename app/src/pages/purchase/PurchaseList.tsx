import { Button, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { useMemo } from 'react';
import { RTTable } from 'src/my-components/react-table/RTTable';
import { usePurchase } from 'src/hooks/myHooks/database/usePurchase';
import { purchaseCols } from './helper/purchase.col';

type Props = {};

const PurchaseList = (props: Props) => {
  const { themeStretch } = useSettingsContext();
  const { deleteMany, purchaseQuery } = usePurchase();

  const { data } = purchaseQuery;
  const tableColumns = useMemo(() => purchaseCols, []);

  return (
    <>
      <Helmet>
        <title> purchase List</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="purchase List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'purchase', href: paths.dashboard.purchase.root },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={paths.dashboard.purchase.add}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New purchase
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

export default PurchaseList;
