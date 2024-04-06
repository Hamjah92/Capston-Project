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
import { useProduct } from 'src/hooks/myHooks/database/useProduct';
import ProductForm from './components/ProductForm';

// ----------------------------------------------------------------------
type Props = {};
const EditProduct: FC<Props> = () => {
  const { themeStretch } = useSettingsContext();

  const { pathname } = useLocation();

  const { productId } = useParams();

  const { getProductById } = useProduct();

  const { data, isFetched } = useQuery({
    queryKey: [`product/${productId}`],
    queryFn: async () => getProductById(productId!),
    initialData: [],
    refetchOnWindowFocus: false,
  });

  const isEdit = pathname.includes('edit');

  return (
    <>
      <Helmet>
        <title>Edit Product</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={!isEdit ? 'Add a new product' : 'Edit product'}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'product', href: paths.dashboard.product.root },
            { name: !isEdit ? 'New product' : capitalCase('edit') },
          ]}
        />
        {isFetched && <ProductForm isEdit={isEdit} currentProduct={data.product} />}
      </Container>
    </>
  );
};

export default EditProduct;
