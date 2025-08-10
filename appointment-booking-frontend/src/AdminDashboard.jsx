
import React, { useEffect, useState } from 'react';
import { getAllBookings } from './api';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';

export default function AdminDashboard({ auth }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getAllBookings(auth.token).then(setBookings);
  }, [auth.token]);

  return (
    <Fade in={true} timeout={500}>
      <div>
        <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
          All Bookings
        </Typography>

        {bookings.length === 0 && (
          <Typography color="text.secondary" align="center">
            No bookings yet.
          </Typography>
        )}

        <Grid container spacing={3}>
          {bookings.map(b => (
            <Grid item xs={12} md={6} key={b._id}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 2,
                  transition: 'box-shadow 0.2s',
                  bgcolor: 'background.paper',
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 2px 8px 0 rgba(33,150,243,0.08)',
                  p: 2,
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600} color="primary">
                    {b.user_id?.email || 'Unknown'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {new Date(b.slot_id.start_at).toLocaleString()}<br /> to <br />
                    {new Date(b.slot_id.end_at).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Fade>
  );
}