# Setting Up Prometheus for Monitoring a Node.js Application: Step-by-Step Guide

Monitoring applications is crucial for maintaining performance, availability, and reliability. In this guide, we’ll set up **Prometheus**, a leading open-source monitoring and alerting toolkit, to scrape metrics from a Node.js application.

---

## 1️⃣ Prerequisites

- Linux machine (Ubuntu/Debian recommended)
- Node.js application running on a known port (e.g., 3000)
- Basic familiarity with terminal commands

---

## 2️⃣ Install Prometheus

1. Download the latest Prometheus release:

```bash
wget https://github.com/prometheus/prometheus/releases/download/v2.49.0/prometheus-2.49.0.linux-amd64.tar.gz
```

2. Extract the tarball:

```bash
tar xvfz prometheus-2.49.0.linux-amd64.tar.gz
cd prometheus-2.49.0.linux-amd64
```

3. Verify installation:

```bash
./prometheus --version
```

You should see the Prometheus version displayed.

---

## 3️⃣ Configure Prometheus

Prometheus uses a configuration file `prometheus.yml`. Open it in a text editor:

```bash
nano prometheus.yml
```

Update the `scrape_configs` section to add your Node.js application as a target:

```yaml
scrape_configs:
  - job_name: 'nodejs_app'
    static_configs:
      - targets: ['localhost:3000']
```

> Ensure your Node.js app exposes metrics in **Prometheus format**, usually via an endpoint like `/metrics`. This is achieved using the [prom-client](https://github.com/siimon/prom-client) package.

---

## 4️⃣ Expose Metrics from Node.js

Install `prom-client` in your Node.js app:

```bash
npm install prom-client express
```

Add the following code to your application:

```javascript
const express = require('express');
const client = require('prom-client');

const app = express();

// Collect default Node.js and system metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Custom Counter: Counts requests to '/'
const requestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests to root endpoint',
});

// Custom Gauge: Tracks current number of active users (mock)
const activeUsersGauge = new client.Gauge({
  name: 'active_users',
  help: 'Number of active users on the system',
});

// Custom Histogram: Tracks response time for '/' endpoint
const responseTimeHistogram = new client.Histogram({
  name: 'response_time_seconds',
  help: 'Response time in seconds for root endpoint',
  buckets: [0.1, 0.3, 0.5, 1, 2, 5],
});

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

// Simulate login/logout to change active users
app.get('/login', (req, res) => { activeUsersGauge.inc(); res.send('User logged in!'); });
app.get('/logout', (req, res) => { activeUsersGauge.dec(); res.send('User logged out!'); });

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Node.js app listening on port ${PORT}`);
  console.log(`Metrics available at http://localhost:${PORT}/metrics`);
});
```

Start your Node.js application:

```bash
node app.js
```

---

## 5️⃣ Run Prometheus

Start Prometheus with your configuration:

```bash
./prometheus --config.file=prometheus.yml
```

Prometheus will start on **[http://localhost:9090](http://localhost:9090)**.

---

## 6️⃣ Verify Metrics

1. Open Prometheus in a browser:  
```
http://localhost:9090/targets
```

2. Ensure your `nodejs_app` job is **UP** and metrics are being scraped.

3. Query metrics on Prometheus web UI, e.g.:

```
http_requests_total
active_users
response_time_seconds
```

---

## 7️⃣ Next Steps

- Integrate **Grafana** for visualization
- Set up **alerts** for critical metrics
- Extend monitoring to multiple services

---

## ✅ Key Takeaways

- Prometheus is simple to install and configure for scraping metrics.
- Node.js apps can expose metrics using `prom-client`.
- Combining Prometheus with Grafana offers powerful monitoring and visualization.

---

