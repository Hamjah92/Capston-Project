import { publicApi } from "src/utils/axios";

export function useRefreshToken() {
  publicApi.defaults.withCredentials = true;
  const refresh = async () => {
    try {
      const { data } = await publicApi.post('/auth/refresh');
      return data;
    } catch (error) {
      return error;
    }
  };

  return refresh;
}
