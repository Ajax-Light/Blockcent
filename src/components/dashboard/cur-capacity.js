import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';

export function CurrentCapacity(props) {
  const userPoints = props.data.Points;
  const cap = Number((Number(userPoints)/10000) * 100);
  return (
    <Card
      sx={{ height: '100%' }}
    >
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
              CURRENT CAPACITY
            </Typography>

            <Typography
              color="textPrimary"
              variant="h4"
            >
              {cap}%
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'warning.main',
                height: 56,
                width: 56
              }}
            >
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <LinearProgress
            value={cap}
            variant="determinate"
          />
        </Box>

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
            ⓘ Used capacity of your wallet. Max capacity is 10000 Points.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
