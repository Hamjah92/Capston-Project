import { usePrivateApi } from '../usePrivateApi';


export const useReport = () => {
  const privateApi = usePrivateApi();


  const getReport = async () => {
    const { data } = await privateApi.get('/report/overview');
    return data;
  };
  const getYearReport = async (year: number) => {
    const { data } = await privateApi.get(`/report/yearly/${year}`);
    return data;
  };


  return {
    getReport,
    getYearReport
  };
};
