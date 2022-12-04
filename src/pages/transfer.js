import Head from 'next/head';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';

const Transfer = ({ data }) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      from: 'PES2UGXXXXXXX',
      to: 'PES2UGXXXXXXX',
      points: 0
    },
    validationSchema: Yup.object({
      from: Yup
        .string()
        .max(255)
        .required(
          'Enter Sender ID'),
      to: Yup
        .string()
        .max(255)
        .required(
          'Enter Recipient ID')
    }),
    /* Add logic to check transaction possible below */
    onSubmit: (to, points) => {
        
    }
  });

  return (
    <>
      <Head>
        <title>Transfer | Blockcent</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
        <NextLink
            href="/dashboard"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Dashboard
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Transfer
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Transfer points from one user to another legally
              </Typography>
            </Box>
            <Box
              sx={{
                pb: 1,
                pt: 3
              }}
            >
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
              >
                Enter details to execute transfer
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.from && formik.errors.from)}
              fullWidth
              helperText={formik.touched.from && formik.errors.from}
              label="FROM"
              margin="normal"
              name="from"
              onBlur={formik.handleBlur}
              type="text"
              value={formik.values.from}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.to && formik.errors.to)}
              fullWidth
              helperText={formik.touched.to && formik.errors.to}
              label="TO"
              margin="normal"
              name="to"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.to}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.points && formik.errors.points)}
              fullWidth
              helperText={formik.touched.points && formik.errors.points}
              label="POINTS"
              margin="normal"
              name="points"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              value={formik.values.points}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Transfer
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Transfer;