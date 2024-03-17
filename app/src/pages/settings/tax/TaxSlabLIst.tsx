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
import { useTax } from 'src/hooks/myHooks/database/useTax';
import { taxCols } from './helper/tax.col';

type Props = {};

const TaxSlabLIst = (props: Props) => {
  const { themeStretch } = useSettingsContext();
  const { getAllTaxSlab, deleteMany } = useTax();

  const tableColumns = useMemo(() => taxCols, []);

  const { data } = useQuery({
    queryKey: ['taxes'],
    queryFn: getAllTaxSlab,
    initialData: [],
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Helmet>
        <title> tax List</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="tax List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'tax', href: paths.dashboard.tax.root },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={paths.dashboard.tax.add}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New tax
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

export default TaxSlabLIst;
