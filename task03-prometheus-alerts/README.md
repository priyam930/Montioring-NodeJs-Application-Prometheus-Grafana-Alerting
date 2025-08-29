# Task 3 – Prometheus Alerts & Grafana Visualization

This guide explains how to configure **alerts in Prometheus** and visualize them in **Grafana** based on metrics collected from a Node.js application.

---

## 1️⃣ Prerequisites

- Node.js application exposing metrics at `/metrics` (from Task 1)
- Prometheus installed and scraping metrics (from Task 1 & 2)
- Grafana installed (from Task 2)
- Basic terminal knowledge

---

## 2️⃣ Files Overview

1. **prometheus.yml** – Prometheus main configuration file
2. **alert.rules.yml** – Prometheus alert rules file (new for Task 3)
3. **Node.js app** – exposes metrics at `/metrics` (no changes from Task 1)
4. **Grafana dashboards** – previously created in Task 2

---

## 3️⃣ Prometheus Alert Configuration

1. Create a new file called `alert.rules.yml`:

```yaml
groups:
  - name: nodejs_alerts
    rules:
      - alert: HighCPUUsage
        expr: process_cpu_seconds_total > 0.8
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "High CPU Usage Detected"
          description: "CPU usage is above 80% for more than 1 minute."

      - alert: HighMemoryUsage
        expr: process_resident_memory_bytes / 1024 / 1024 > 500
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: "High Memory Usage Detected"
          description: "Memory usage is above 500MB for more than 1 minute."
```

> You can customize the metrics and thresholds based on your Node.js app’s usage.

2. Update **prometheus.yml** to include the alert rules:

```yaml
rule_files:
  - "alert.rules.yml"
```

3. Restart Prometheus:

```bash
./prometheus --config.file=prometheus.yml
```

Prometheus will now evaluate alerts continuously.

---

## 4️⃣ Grafana Alert Panel Setup

1. Open Grafana: [http://localhost:3000](http://localhost:3000) (default port)
2. Edit the existing dashboard panel for CPU usage.
3. Go to the **Alerts** tab:
   - Set **Conditions** (e.g., `CPU Usage > 80%` for `1m`)
   - Optionally, configure **notifications** (email, Slack, webhook)
4. Save the dashboard.

Repeat for memory or other metrics if needed.

---

## 5️⃣ Verification

1. Go to Prometheus web UI: [http://localhost:9090/alerts](http://localhost:9090/alerts)
   - You should see your active alerts listed.
2. In Grafana, panels with alert conditions will show **red/yellow states** when thresholds are crossed.

---

## 6️⃣ Optional: Alertmanager Setup

If you want **automatic notifications**, install and configure Alertmanager:

1. Install Alertmanager:

```bash
wget https://github.com/prometheus/alertmanager/releases/download/v0.26.0/alertmanager-0.26.0.linux-amd64.tar.gz
tar xvfz alertmanager-0.26.0.linux-amd64.tar.gz
cd alertmanager-0.26.0.linux-amd64
./alertmanager --config.file=alertmanager.yml
```

2. Update Prometheus config to point to Alertmanager:

```yaml
alerting:
  alertmanagers:
    - static_configs:
        - targets: ['localhost:9093']
```

---

## ✅ Key Takeaways

- Prometheus can trigger alerts based on **metric thresholds**.
- Grafana allows visualizing metrics and alert states on dashboards.
- Combining Prometheus + Grafana + Alertmanager enables **real-time monitoring and notifications**.

