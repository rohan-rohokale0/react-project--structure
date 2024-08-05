import { Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import BarChart from './bar_chart';
import PieChart from './pie_chart';
import LineChart from './line_chart';

const Dashboard: React.FC = () => {
  return (
    <>
      <Grid container direction="row" spacing={2} columns={{ xs: 4, md: 12 }} justifyContent={{ xs: 'center', md: 'flex-start' }}>
        <Grid item xs={3}>
          <Card sx={{ backgroundColor: '#f5f5f5', }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" component="div">
                Category Count
              </Typography>
              <Typography variant="h4" component="div" color="textPrimary">
                20
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ backgroundColor: '#f5f5f5', }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" component="div">
                Category Count
              </Typography>
              <Typography variant="h4" component="div" color="textPrimary">
                20
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ backgroundColor: '#f5f5f5', }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" component="div">
                Category Count
              </Typography>
              <Typography variant="h4" component="div" color="textPrimary">
                20
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ backgroundColor: '#f5f5f5', }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" component="div">
                Category Count
              </Typography>
              <Typography variant="h4" component="div" color="textPrimary">
                20
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container direction="row" spacing={2} columns={{ xs: 6, md: 12 }} >
        <Grid item xs={6}>
          <Card sx={{ mt: 2 }}>
            <BarChart />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ mt: 2 }}>
          <LineChart />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ mb: 8 }}>
          <PieChart />
           
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
