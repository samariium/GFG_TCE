const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Tier 1 - API Endpoints
app.get('/api/data', (req, res) => {
    res.json({ message: 'Data from backend', users: ['Samar', 'Rahul', 'GFG'] });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy' });
});

app.listen(3000, () => console.log('Backend running on :3000'));
