import PropTypes from 'prop-types';
import * as React from 'react';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography, Button, Snackbar, Alert, IconButton } from '@mui/material';
import { Point as PointIcon} from '../../icons/point';
import CloseIcon from '@mui/icons-material/Close'

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
  setError(false);
};

const action = (
  <React.Fragment>
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

export const ProductCard = ({ product, data, ...rest }) => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
        {...rest}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pb: 3
            }}
          >
            <Avatar
              alt="Product"
              src={product.media}
              variant="square"
            />
          </Box>
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {product.title}
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="body1"
          >
            {product.description}
          </Typography>
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Box sx={{ p: 2 }}>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: 'center' }}
          >
            <Grid
              item
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  if(product.worth <= data.Points){
                    const buy = {
                      id: data.ID,
                      name: data.Name,
                      points: product.worth,
                      type: 'Student',
                      owns: {
                        product : 1
                      }
                    }
                    fetch('http://localhost:8090/api/users/update', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(buy)
                    })
                    .then((response) => response.json())
                    .then((buy) => {
                      console.log('Posting Data Success:', buy);
                    })
                    .catch((error) => {
                      console.error('Posting Data Error:', error);
                    });
                    setOpen(true);
                  } else {
                    setError(true);
                    setOpen(true);
                  }
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    action={action}
                  >
                    {error === false ? 
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                      Item purchased for {product.worth} points successfully!
                    </Alert> :
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                      Item purchase failed!
                    </Alert>
                    }
                  </Snackbar>
                }}
              >
                <PointIcon color="primary" />
                <Typography
                  color="textPrimary"
                  display="inline"
                  sx={{ pl: 1 }}
                  variant="body2"
                >
                  {product.worth}
                  {' '}
                  Points
                  {data.Points}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};