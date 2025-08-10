import React, { useEffect, useState } from 'react';
import { getAllBookings } from './api';

export default function AdminDashboard({ auth }) {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    getAllBookings(auth.token).then(setBookings);
  }, [auth.token]);

  return (
    <div>
      <h2 className="text-3xl font-extrabold mb-8 text-center text-pink-700 drop-shadow-lg">All Bookings</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map(b => (
          <li key={b._id} className="p-6 bg-gradient-to-br from-pink-100 via-blue-100 to-purple-200 rounded-2xl border-2 border-pink-200 shadow-lg text-blue-900 font-semibold text-lg hover:scale-105 transition-transform duration-200">
            <span className="font-bold text-pink-700">{b.user_id?.email || 'Unknown'}</span><br />
            {new Date(b.slot_id.start_at).toLocaleString()}<br />-<br />{new Date(b.slot_id.end_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
