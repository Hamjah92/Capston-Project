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
  },
};
