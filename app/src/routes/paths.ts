// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    user: {
      root: `${ROOTS.DASHBOARD}/user/list`,
      add: `${ROOTS.DASHBOARD}/user/add`,
    },
    customer: {
      root: `${ROOTS.DASHBOARD}/customer`,
      list: `${ROOTS.DASHBOARD}/customer/list`,
      add: `${ROOTS.DASHBOARD}/customer/add`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/customer/edit/${id}`,
    },
    supplier: {
      root: `${ROOTS.DASHBOARD}/supplier`,
      list: `${ROOTS.DASHBOARD}/supplier/list`,
      add: `${ROOTS.DASHBOARD}/supplier/add`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/supplier/edit/${id}`,
    },
    product: {
      root: `${ROOTS.DASHBOARD}/product`,
      list: `${ROOTS.DASHBOARD}/product/list`,
      add: `${ROOTS.DASHBOARD}/product/add`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/product/edit/${id}`,
    },
    purchases: {
      root: `${ROOTS.DASHBOARD}/purchases`,
      list: `${ROOTS.DASHBOARD}/purchases/list`,
      add: `${ROOTS.DASHBOARD}/purchases/add`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/purchases/edit/${id}`,
    },
    tax: {
      root: `${ROOTS.DASHBOARD}/tax`,
      list: `${ROOTS.DASHBOARD}/tax/list`,
      add: `${ROOTS.DASHBOARD}/tax/add`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/tax/edit/${id}`,
    },
  },
};
