const express = require('express');
const path = require('path');
const app = express();

// Serve the frontend from the same container
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// API endpoints
app.get('/api/data', (req, res) => {
    res.json({ message: 'Data from backend', users: ['Samar', 'Rahul', 'GFG'] });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy' });
});

app.listen(3000, () => console.log('App running on :3000'));
