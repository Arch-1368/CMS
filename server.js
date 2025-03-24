const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5001;
app.get('/api', (req, res) => {
    res.send("Welcome to the Church Management API");
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/offerings', require('./routes/offeringRoutes'));

app.get('/', (req, res) => res.send("Church Management API is Running..."));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
