const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    start_at: { type: Date, required: true },
    end_at: { type: Date, required: true },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Slot', slotSchema);
