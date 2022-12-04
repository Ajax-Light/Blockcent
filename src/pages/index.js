import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';

export async function getServerSideProps() {
  const res = await fetch('http://localhost:8090/api/users');
  const data = await res.json();
  
  return {
    props: {
      data
    }
  };
}

const Login = ({ data }) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      id: 'PES2UGXXXXXXX',
      password: 'password'
    },
    validationSchema: Yup.object({
      id: Yup
        .string()
        .max(255)
        .required(
          'SRN is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
    onSubmit: (schema) => {
      const auth = false;
      for(let i = 0; i < data.length; ++i){
        if(data[i].ID === schema.id){
          auth = true;
          fetch(`http://localhost:3000/api/cookie?userid=${data[i].ID}&numUsers=${data.length}`);
          break;
        }
      }
      if(auth){
        router.push("/dashboard");
      }
      else
        router.push("/404")
    }
  });

  return (
    <>
    
      <Head>
        <title>Login | Blockcent</title>
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
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Sign in
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Sign in on the internal platform
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
                Login with respective ID/SRN
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.id && formik.errors.id)}
              fullWidth
              helperText={formik.touched.id && formik.errors.id}
              label="SRN"
              margin="normal"
              name="id"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.id}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
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
                Sign In Now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Don&apos;t have an account?
              {' '}
              <NextLink
                href="/register"
              >
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  Sign Up
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;