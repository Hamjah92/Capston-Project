// @mui
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// _mock
import {
  _ecommerceNewProducts,
  _ecommerceSalesOverview,
  _ecommerceBestSalesman,
  _ecommerceLatestProducts,
} from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
// assets
import { useReport } from 'src/hooks/myHooks/database/useReport';
import { useQuery } from '@tanstack/react-query';
import { WidgetSummary } from './WidgetSummary';
import { YearlySales } from './YearlySales';
// ----------------------------------------------------------------------

export const DashboardOverview = () => {
  const theme = useTheme();

  const settings = useSettingsContext();

  const { getReport, getYearReport } = useReport();
  const { data, isFetching } = useQuery({
    queryKey: ['report/overview'],
    queryFn: getReport,
    initialData: [],
    refetchOnWindowFocus: false,
  });

  // Fetch the yearly report data
  const { data: yearlyData, isFetching: isFetchingYearly } = useQuery({
    queryKey: ['report/yearly', 2024],
    queryFn: () => getYearReport(2024),
    initialData: [],
    refetchOnWindowFocus: false,
  });

  if (isFetching || isFetchingYearly) return 'Loading...';

  const { totalSales, totalPurchases, salesProfit } = data;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <WidgetSummary
            title="Total Expenses"
            percent={2.6}
            total={totalPurchases ?? 0}
            chart={{
              series: [22, 8, 35, 50, 82, 84, 77, 12, 87, 43],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <WidgetSummary
            title="Total Income"
            percent={0.6}
            total={totalSales ?? 0}
            chart={{
              colors: [theme.palette.warning.light, theme.palette.warning.main],
              series: [40, 70, 75, 70, 50, 28, 7, 64, 38, 27],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <WidgetSummary
            title="Total Profit"
            percent={-0.1}
            total={salesProfit ?? 0}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [56, 47, 40, 62, 73, 30, 23, 54, 67, 68],
            }}
          />
        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <YearlySales
            title="Yearly Sales"
            chart={{
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: [
                {
                  year: '2022',
                  data: [
                    {
                      name: 'Total Income',
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                    },
                    {
                      name: 'Total Expenses',
                      data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
                    },
                  ],
                },
                {
                  year: '2023',
                  data: [
                    {
                      name: 'Total Income',
                      data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                    },
                    {
                      name: 'Total Expenses',
                      data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
                    },
                  ],
                },
                {
                  year: '2024',
                  data: [
                    {
                      name: 'Total Income',
                      data: yearlyData.salesSeries.data ?? [56, 47, 40, 62, 73, 30, 23, 54, 67, 68],
                    },
                    {
                      name: 'Total Expenses',
                      data: yearlyData.purchasesSeries.data ?? [
                        56, 47, 40, 62, 73, 30, 23, 54, 67, 68,
                      ],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
