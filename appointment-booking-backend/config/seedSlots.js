const Slot = require('../models/Slot');

async function seedSlots() {
    const now = new Date();
    const startHour = 9;
    const endHour = 17;
    const slotDuration = 30; // minutes
    const days = 7;

    for (let d = 0; d < days; d++) {
        const date = new Date(now);
        date.setDate(now.getDate() + d);
        for (let h = startHour; h < endHour; h++) {
            for (let m = 0; m < 60; m += slotDuration) {
                const start_at = new Date(date);
                start_at.setHours(h, m, 0, 0);
                const end_at = new Date(start_at);
                end_at.setMinutes(start_at.getMinutes() + slotDuration);
                const exists = await Slot.findOne({ start_at });
                if (!exists) {
                    await Slot.create({ start_at, end_at });
                }
            }
        }
    }
    console.log('Seeded slots for next 7 days');
}

module.exports = seedSlots;
