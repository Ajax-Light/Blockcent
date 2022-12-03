import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { SRN } from '../components/dashboard/srn';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { LatestProducts } from '../components/dashboard/latest-products';
import { CurrentCapacity } from '../components/dashboard/cur-capacity';
import { TotalCustomers } from '../components/dashboard/total-customers';
import { TotalPoints } from '../components/dashboard/total-points';
import { DashboardLayout } from '../components/dashboard-layout';

export async function getServerSideProps() {
  const user = "PES2UG19CS197"
  const res = await fetch('http://localhost:8090/api/users/' + user)
  const data = await res.json();
  
  return {
    props: {
      data
    }
  };
}

function Dashboard({ data }) {
  return (
    <>
      <Head>
        <title>
          Dashboard | Blockcent
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={3}
              sm={1}
              xl={1}
              xs={1}
            >
              <SRN data={data} />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <TotalCustomers />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <CurrentCapacity data={data} />
            </Grid>
            <Grid
              item
              xl={1}
              lg={3}
              sm={6}
              xs={3}
            >
              <TotalPoints sx={{ height: '100%' }} data={data} />
            </Grid>
            <Grid
              item
              lg={4}
              md={8}
              xl={9}
              xs={12}
            >

              <LatestProducts sx={{ height: '100%' }} />
            </Grid>
            <Grid
              item
              lg={8}
              md={8}
              xl={9}
              xs={12}
            >
              <LatestOrders />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
