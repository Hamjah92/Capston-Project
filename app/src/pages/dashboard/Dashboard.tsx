import { Helmet } from 'react-helmet-async';
import { DashboardOverview } from './components/DashboardOverview';
// sections

// ----------------------------------------------------------------------

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title> Dashboard: E-Commerce</title>
      </Helmet>

      <DashboardOverview />
    </>
  );
}
