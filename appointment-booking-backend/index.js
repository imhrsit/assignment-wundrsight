const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('API is running');
});
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/slots'));
app.use('/api', require('./routes/bookings'));

const seedAdmin = require('./config/seedAdmin');
const seedSlots = require('./config/seedSlots');

const PORT = process.env.PORT || 5003;

connectDB().then(async () => {
    await seedAdmin();
    await seedSlots();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
