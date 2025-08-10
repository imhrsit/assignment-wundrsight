
import React, { useEffect, useState } from 'react';
import { getSlots, bookSlot, getMyBookings } from './api';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';

export default function PatientDashboard({ auth }) {
    const [slots, setSlots] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const from = new Date().toISOString();
        const to = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
        getSlots(auth.token, from, to).then(setSlots);
        getMyBookings(auth.token).then(setBookings);
    }, [auth.token]);

    const handleBook = async slotId => {
        if (!slotId) {
            setError('Invalid slot. Please try again.');
            return;
        }
        setLoading(true);
        setError('');
        const res = await bookSlot(auth.token, slotId);
        if (res.booking) {
            getMyBookings(auth.token).then(setBookings);
            setSlots(slots.filter(s => s._id !== slotId));
        } else {
            setError(res.error?.message || 'Booking failed');
        }
        setLoading(false);
    };

    return (
        <Fade in={true} timeout={500}>
            <div>
                {/* Available Slots */}
                <Typography variant="h4" fontWeight={700} color="primary" mb={2}>
                    Available Slots
                </Typography>
                {slots.length === 0 && (
                    <Typography color="text.secondary">No slots available.</Typography>
                )}
                <Grid container spacing={3}>
                    {slots.map(slot => (
                        <Grid item xs={12} md={6} key={slot._id}>
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
                                        {new Date(slot.start_at).toLocaleString()}<br /> to <br />{new Date(slot.end_at).toLocaleString()}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={loading}
                                        onClick={() => handleBook(slot._id)}
                                        sx={{ mt: 2, fontWeight: 600, borderRadius: 2, fontSize: '1rem' }}
                                    >
                                        Book
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* My Bookings */}
                <Typography variant="h4" fontWeight={700} color="primary" mt={6} mb={2}>
                    My Bookings
                </Typography>
                {bookings.length === 0 && (
                    <Typography color="text.secondary">You have no bookings yet.</Typography>
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
                                        {new Date(b.slot_id.start_at).toLocaleString()}<br /> to <br />{new Date(b.slot_id.end_at).toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {error && (
                    <Typography color="error" fontWeight={600} mt={3}>{error}</Typography>
                )}
            </div>
        </Fade>
    );
}