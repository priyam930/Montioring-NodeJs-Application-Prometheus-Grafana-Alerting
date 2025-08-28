# Grafana Dashboard Setup for Node.js Metrics

This guide explains how to set up Grafana to visualize metrics collected by Prometheus.

---

## 1️⃣ Prerequisites
- Prometheus running and scraping metrics from your Node.js application
- Grafana installed (https://grafana.com/docs/grafana/latest/installation/)

---

## 2️⃣ Configure Grafana

1. Start Grafana:
   sudo systemctl start grafana-server
   sudo systemctl enable grafana-server
   Grafana web UI: http://localhost:3000 (default user: admin, password: admin)

2. Add Prometheus as a data source:
   - Navigate to **Configuration → Data Sources → Add data source → Prometheus**
   - URL: http://localhost:9090
   - Click **Save & Test** to verify

---

## 3️⃣ Create Dashboard

1. Click **Create → Dashboard → Add new panel**
2. Select **Prometheus** as the data source
3. Example queries:
   - CPU usage: `process_cpu_seconds_total`
   - Memory usage: `process_resident_memory_bytes`
   - Custom metrics: `http_requests_total`, `active_users`
4. Add panels for each metric (Graph, Gauge, or Table)
5. Save the dashboard

---

## 4️⃣ Optional: Provisioning Dashboards

Grafana allows auto-loading dashboards and datasources using provisioning files.

- Place `datasources.yaml` and `dashboards.yaml` in `/etc/grafana/provisioning/`
- Place dashboard JSON files in the folder referenced in `dashboards.yaml`
- Restart Grafana to load dashboards automatically

---

## 5️⃣ Notes

- You can export any dashboard as JSON from Grafana UI and re-use it
- Alerts can be set on specific metrics in Grafana panels
- Dashboard JSON file provided as `dashboard.json` in this repo
