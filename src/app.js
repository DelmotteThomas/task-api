const express = require('express');
const logger = require('./middleware/logger');
const tasksRouter = require('./routes/tasks');

const app = express();

app.use(express.json());
app.use(logger);

app.use('/api/tasks', tasksRouter);

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;