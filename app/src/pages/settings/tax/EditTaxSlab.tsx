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
import { useTax } from 'src/hooks/myHooks/database/useTax';
import { TaxForm } from './components/TaxForm';

// ----------------------------------------------------------------------
type Props = {};
const EditTaxSlab: FC<Props> = () => {
  const { themeStretch } = useSettingsContext();

  const { pathname } = useLocation();

  const { taxId } = useParams();

  const { getTaxById } = useTax();

  const { data, isFetched } = useQuery({
    queryKey: [`taxes/${taxId}`],
    queryFn: async () => getTaxById(taxId!),
    initialData: [],
    refetchOnWindowFocus: false,
  });

  const isEdit = pathname.includes('edit');

  return (
    <>
      <Helmet>
        <title>Edit tax</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={!isEdit ? 'Add a new tax' : 'Edit tax'}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'tax', href: paths.dashboard.tax.root },
            { name: !isEdit ? 'New tax' : capitalCase('edit') },
          ]}
        />
        {isFetched && <TaxForm isEdit={isEdit} currentTax={data.tax} />}
      </Container>
    </>
  );
};

export default EditTaxSlab;
