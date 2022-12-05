import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Container, TextField, Typography, Snackbar, Alert, IconButton } from '@mui/material';
import { getCookie } from 'cookies-next';

export async function getServerSideProps({req, resp}) {
  const userid = getCookie('userid', {req, resp});
  if(userid === undefined) {
    console.error(`\n-> userid Cookie is undefined`);
  }

  let res = await fetch(`http://localhost:8090/api/users/${userid}`);
  const res2 = await fetch('http://localhost:8090/api/users');
  let data = await res.json();
  const allUsers = await res2.json();

  return {
    props: {
      data, allUsers
    }
  };
}

const Transfer = ({ data, allUsers }) => {
  const [open, setOpen] = React.useState(false);

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      from: data.ID,
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
    onSubmit: (schema) => {
      const exists = false;
      for(let i = 0; i < allUsers.length; ++i){
        if(allUsers[i].ID === schema.to){
          exists = true;
          break;
        }
      };
      exists = (schema.points > 0 && schema.points <= data.Points && schema.from != schema.to) ? true: false;
      if(!exists){
        alert("Illegal");
      } else {
        fetch(`http://localhost:8090/api/users/transfer/${schema.from}-${schema.to}-${schema.points}`, {
          method: 'PUT'
        })
        .then((response) => {response.json()})
        .then((transaction) => {
          console.log('Posting Data Success:', transaction);
        })
        .catch((error) => {
          console.error('Posting Data Error:', error);
        });
        setOpen(true);
      }
    }
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

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
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Transfer of {formik.values.points} points from {formik.values.from} to {formik.values.to} successful!
        </Alert>
      </Snackbar>
      </Box>
    </>
  );
};

export default Transfer;