const express = require('express');
const Booking = require('../models/Booking');
const Slot = require('../models/Slot');
const { authMiddleware } = require('../config/auth');

const router = express.Router();

// Book a slot
router.post('/book', authMiddleware('patient'), async (req, res) => {
    const { slotId } = req.body;
    if (!slotId) return res.status(400).json({ error: 'Missing slotId' });
    const slot = await Slot.findById(slotId);
    if (!slot) return res.status(404).json({ error: 'Slot not found' });
    const exists = await Booking.findOne({ slot_id: slotId });
    if (exists) {
        return res.status(409).json({ error: { code: 'SLOT_TAKEN', message: 'Slot already booked' } });
    }
    const booking = await Booking.create({ user_id: req.user.id, slot_id: slotId });
    res.status(201).json({ message: 'Booked', booking });
});

// Get my bookings (patient)
router.get('/my-bookings', authMiddleware('patient'), async (req, res) => {
    const bookings = await Booking.find({ user_id: req.user.id }).populate('slot_id');
    res.json(bookings);
});

// Get all bookings (admin)
router.get('/all-bookings', authMiddleware('admin'), async (req, res) => {
    const bookings = await Booking.find().populate('slot_id user_id');
    res.json(bookings);
});

module.exports = router;
