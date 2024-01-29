import { Helmet } from 'react-helmet-async';
// sections
import OneView from 'src/sections/dashboard/view';

// ----------------------------------------------------------------------

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title> Dashboard</title>
      </Helmet>

      <OneView />
    </>
  );
}
