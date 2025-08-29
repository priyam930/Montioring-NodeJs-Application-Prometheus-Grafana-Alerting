
---

### **Task 2 → Task 3 Updates**

1. **Prometheus Config**

   * **Task 2:** Prometheus was just scraping metrics from your Node.js app.
   * **Task 3:** You need to **add an alerting rules file** (`alert.rules.yml`) and reference it in `prometheus.yml`:

     ```yaml
     rule_files:
       - "alert.rules.yml"
     ```
   * This allows Prometheus to evaluate alert rules continuously.

2. **Alert Rules**

   * **New File:** `alert.rules.yml`
   * Define **metric thresholds** you want alerts for (e.g., CPU > 80%, memory usage > 70%).
   * Example for CPU:

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
     ```

3. **Grafana**

   * **Task 2:** You created a dashboard showing CPU, memory metrics.
   * **Task 3:** You now **configure alerts in Grafana panels**:

     * In Grafana, edit the panel (CPU usage).
     * Set **alert condition** based on the same metric (e.g., CPU > 80%).
     * Connect it to your alerting notification channels (optional: Slack, email).

4. **No Changes to Node.js App**

   * The Node.js app stays the same; metrics exposure doesn’t change.
   * Prometheus will scrape the same `/metrics` endpoint.

5. **Optional Alertmanager**

   * If you want **real notifications** (email/Slack), configure **Alertmanager** and point Prometheus to it:

     ```yaml
     alerting:
       alertmanagers:
         - static_configs:
             - targets:
               - 'localhost:9093'
     ```

---

✅ **Summary:**
From Task 2 → Task 3, the only real “updates” are:

* **Add alert rules file** (`alert.rules.yml`)
* **Update `prometheus.yml`** to reference alert rules
* **Configure Grafana panels** to show alerts

Everything else (Node.js app, metrics, dashboards) stays the same.

---

