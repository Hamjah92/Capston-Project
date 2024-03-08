import { Container } from '@mui/material';
import { capitalCase } from 'change-case';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useParams } from 'react-router';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { paths } from 'src/routes/paths';
import ProductForm from './components/ProductForm';

type Props = {};

const AddProduct: FC<Props> = () => {
  const { name = '' } = useParams();
  const { themeStretch } = useSettingsContext();
  const { pathname } = useLocation();

  const isEdit = pathname.includes('edit');
  return (
    <>
      <Helmet>
        <title>Add Product</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={!isEdit ? 'New product' : 'Edit product'}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Product', href: paths.dashboard.product.list },
            { name: !isEdit ? 'New product' : capitalCase(name) },
          ]}
        />
        <ProductForm isEdit={isEdit} />
      </Container>
    </>
  );
};

export default AddProduct;
