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
    <div>
      <h2 className="text-3xl font-extrabold mb-8 text-center text-purple-700 drop-shadow-lg">Available Slots</h2>
      {slots.length === 0 && <div className="text-gray-500 mb-4 text-center">No slots available</div>}
      <ul className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {slots.map(slot => (
          <li key={slot._id} className="p-6 bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100 rounded-2xl border-2 border-purple-200 shadow-lg flex flex-col gap-3 hover:scale-105 transition-transform duration-200">
            <span className="text-purple-900 font-semibold text-lg">
              {new Date(slot.start_at).toLocaleString()}<br />-<br />{new Date(slot.end_at).toLocaleString()}
            </span>
            <button disabled={loading} onClick={() => handleBook(slot._id)} className="px-4 py-2 bg-pink-500 text-white rounded-xl shadow hover:bg-pink-600 transition disabled:opacity-50 font-bold text-lg">
              Book
            </button>
          </li>
        ))}
      </ul>
      <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700 drop-shadow-lg">My Bookings</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map(b => (
          <li key={b._id} className="p-6 bg-gradient-to-br from-pink-100 via-blue-100 to-purple-200 rounded-2xl border-2 border-blue-200 shadow-lg text-blue-900 font-semibold text-lg hover:scale-105 transition-transform duration-200">
            {new Date(b.slot_id.start_at).toLocaleString()}<br />-<br />{new Date(b.slot_id.end_at).toLocaleString()}
          </li>
        ))}
      </ul>
      {error && <div className="text-pink-600 mt-6 text-center font-bold animate-shake">{error}</div>}
      <style>{`
        @keyframes shake {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(4px); }
          30%, 50%, 70% { transform: translateX(-8px); }
          40%, 60% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
    </div>
    );
}
