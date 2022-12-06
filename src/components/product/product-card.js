import PropTypes from 'prop-types';
import * as React from 'react';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography, Button } from '@mui/material';
import { Point as PointIcon} from '../../icons/point';
import { m as productNameMap } from '../dashboard/latest-products';

// Accept Owns JSON, return updated Owns JSON
function buyProduct(owns, product) {
  // First check if product is already owned
  const owns_array = Object.entries(owns);
  for(var i = 0; i < owns_array.length; i++) {
    if(product.title.toLowerCase().match(owns_array[i][0])) {
      owns[owns_array[i][0]] = Number(owns_array[i][1]) + 1;
      alert('match found!!');
      return owns;
    }
  }
  // Product not found, add it
  for(const [k,v] of productNameMap) {
    if(v.name == product.name) {
      owns.k = 1;
      alert('match not found, adding');
      return owns;
    }
  }
  return owns;
}

export const ProductCard = ({ product, data, ...rest }) => {

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
                  if(Number(product.worth) <= Number(data.Points)){
                    data.Owns = buyProduct(data.Owns, product);
                    const buy_payload = {
                      id: data.ID,
                      name: data.Name,
                      points: (Number(data.Points) - Number(product.worth)).toString(),
                      type: 'Student',
                      owns: data.Owns
                    }
                    fetch('http://localhost:8090/api/users/update', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(buy_payload)
                    })
                    .then((response) => response.json())
                    .then((buy) => {
                      console.log('Posting Data Success:', buy);
                    })
                    .catch((error) => {
                      console.error('Posting Data Error:', error);
                    });
                    alert("Buy Success");
                  } else {
                    alert("Illegal Buy");
                  }
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