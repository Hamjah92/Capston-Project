import { Container } from '@mui/material';
import { capitalCase } from 'change-case';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { paths } from 'src/routes/paths';
import { TaxForm } from './components/TaxForm';

type Props = {};

const AddTaxSlab = (props: Props) => {
  const { themeStretch } = useSettingsContext();
  const { pathname } = useLocation();

  const isEdit = pathname.includes('edit');

  return (
    <>
      <Helmet>
        <title>Add Tax Slab</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={!isEdit ? 'Add a new Tax Slab' : 'Edit Tax Slab'}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Tax', href: paths.dashboard.tax.root },
            { name: !isEdit ? 'New Tax Slab' : capitalCase('Edit Tax Slab') },
          ]}
        />
        <TaxForm isEdit={isEdit} />
      </Container>
    </>
  );
};

export default AddTaxSlab;
