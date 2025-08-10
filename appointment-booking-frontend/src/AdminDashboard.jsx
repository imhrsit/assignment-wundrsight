import React, { useEffect, useState } from 'react';
import { getAllBookings } from './api';

export default function AdminDashboard({ auth }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getAllBookings(auth.token).then(setBookings);
  }, [auth.token]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">All Bookings</h2>

      {bookings.length === 0 && (
        <p className="text-gray-500 text-center">No bookings yet.</p>
      )}

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map(b => (
          <li
            key={b._id}
            className="p-5 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition"
          >
            <p className="font-semibold text-gray-800">{b.user_id?.email || 'Unknown'}</p>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(b.slot_id.start_at).toLocaleString()}
              <br /> to <br />
              {new Date(b.slot_id.end_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}