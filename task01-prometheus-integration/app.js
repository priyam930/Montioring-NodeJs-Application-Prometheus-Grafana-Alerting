const express = require('express');
const client = require('prom-client');

const app = express();

// ----------------------------
// Prometheus Metrics Setup
// ----------------------------

// Collect default Node.js and system metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Custom Counter: Counts the number of requests to '/'
const requestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests to root endpoint',
});

// Custom Gauge: Tracks current number of active users (mocked)
const activeUsersGauge = new client.Gauge({
  name: 'active_users',
  help: 'Number of active users on the system',
});

// Custom Histogram: Tracks response time for '/' endpoint
const responseTimeHistogram = new client.Histogram({
  name: 'response_time_seconds',
  help: 'Response time in seconds for root endpoint',
  buckets: [0.1, 0.3, 0.5, 1, 2, 5], // customize as needed
});

// ----------------------------
// Routes
// ----------------------------

// Root endpoint
app.get('/', (req, res) => {
  const end = responseTimeHistogram.startTimer(); // start timing
  requestCounter.inc(); // increment request counter

  // Simulate active users (for demo purposes)
  const activeUsers = Math.floor(Math.random() * 50) + 1;
  activeUsersGauge.set(activeUsers);

  res.send('Hello! Node.js app with Prometheus metrics is running.');
  end(); // stop timing
});

// Custom endpoint to simulate user login (increments active users)
app.get('/login', (req, res) => {
  activeUsersGauge.inc();
  res.send('User logged in!');
});

// Custom endpoint to simulate user logout (decrements active users)
app.get('/logout', (req, res) => {
  activeUsersGauge.dec();
  res.send('User logged out!');
});

// Metrics endpoint for Prometheus to scrape
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

// ----------------------------
// Start Server
// ----------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Node.js app listening on port ${PORT}`);
  console.log(`Metrics available at http://localhost:${PORT}/metrics`);
});
