const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function seedAdmin() {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) return;

    const existing = await User.findOne({ email: adminEmail });
    if (!existing) {
        const password_hash = await bcrypt.hash(adminPassword, 10);
        await User.create({
            name: 'Admin',
            email: adminEmail,
            password_hash,
            role: 'admin',
        });
        console.log('Seeded admin user');
    }
}

module.exports = seedAdmin;
