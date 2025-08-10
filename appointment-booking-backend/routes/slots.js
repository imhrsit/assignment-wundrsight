const express = require('express');
const Slot = require('../models/Slot');
const Booking = require('../models/Booking');
const { authMiddleware } = require('../config/auth');

const router = express.Router();

// Get available slots for next 7 days
router.get('/slots', async (req, res) => {
    const { from, to } = req.query;
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const slots = await Slot.find({ start_at: { $gte: fromDate, $lte: toDate } });
    const bookedSlots = await Booking.find({ slot_id: { $in: slots.map(s => s._id) } });
    const bookedIds = bookedSlots.map(b => b.slot_id.toString());
    const available = slots.filter(s => !bookedIds.includes(s._id.toString()));
    res.json(available);
});

module.exports = router;
