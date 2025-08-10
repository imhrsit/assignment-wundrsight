import React, { useEffect, useState } from 'react';
import { getSlots, bookSlot, getMyBookings } from './api';

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
        setLoading(true);
        setError('');
        const res = await bookSlot(auth.token, slotId);
        if (res.booking) {
            setBookings([...bookings, res.booking]);
            setSlots(slots.filter(s => s._id !== slotId));
        } else {
            setError(res.error?.message || 'Booking failed');
        }
        setLoading(false);
    };

    return (
        <div className="space-y-8">
            {/* Available Slots */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Slots</h2>
                {slots.length === 0 && <p className="text-gray-500">No slots available.</p>}
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {slots.map(slot => (
                        <li key={slot._id} className="p-5 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition flex flex-col gap-3">
                            <p className="text-gray-800 font-medium">
                                {new Date(slot.start_at).toLocaleString()}<br /> to <br />{new Date(slot.end_at).toLocaleString()}
                            </p>
                            <button
                                disabled={loading}
                                onClick={() => handleBook(slot._id)}
                                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg shadow hover:scale-[1.02] transition disabled:opacity-50 font-semibold"
                            >
                                Book
                            </button>
                        </li>
                    ))}
                </ul>
            </section>

            {/* My Bookings */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">My Bookings</h2>
                {bookings.length === 0 && <p className="text-gray-500">You have no bookings yet.</p>}
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {bookings.map(b => (
                        <li key={b._id} className="p-5 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition">
                            <p className="text-gray-800 font-medium">
                                {new Date(b.slot_id.start_at).toLocaleString()}<br /> to <br />{new Date(b.slot_id.end_at).toLocaleString()}
                            </p>
                        </li>
                    ))}
                </ul>
            </section>

            {error && <div className="text-red-500 font-medium">{error}</div>}
        </div>
    );
}