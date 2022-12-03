import { Avatar, Card, CardContent, Grid, Box, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export function TotalPoints(props) {
  const userPoints = props.data.Points;
  return ( 
    <Card >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
            >
              TOTAL POINTS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {userPoints}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                height: 56,
                width: 56
              }}
            >
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            pt: 2
          }}
        >
          <Typography
            color="textSecondary"
            variant="caption"
          >
            ⓘ Current total number of points present in your wallet
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}