const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    slot_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true, unique: true },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);
