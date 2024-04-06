
const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};


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
    invoice: {
      root: `${ROOTS.DASHBOARD}/invoice`,
      list: `${ROOTS.DASHBOARD}/invoice/list`,
      add: `${ROOTS.DASHBOARD}/invoice/add`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/invoice/edit/${id}`,
      view: (id: string) => `${ROOTS.DASHBOARD}/invoice/view/${id}`,

    },
    purchase: {
      root: `${ROOTS.DASHBOARD}/purchase`,
      list: `${ROOTS.DASHBOARD}/purchase/list`,
      add: `${ROOTS.DASHBOARD}/purchase/add`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/purchase/edit/${id}`,
      view: (id: string) => `${ROOTS.DASHBOARD}/purchase/view/${id}`,
    },
    tax: {
      root: `${ROOTS.DASHBOARD}/tax`,
      list: `${ROOTS.DASHBOARD}/tax/list`,
      add: `${ROOTS.DASHBOARD}/tax/add`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/tax/edit/${id}`,
    },
  },
};
