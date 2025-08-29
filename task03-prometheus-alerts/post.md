🚨 **Task 3: Setting Up Prometheus Alerts and Visualizing in Grafana** 🚨

In this part of my monitoring journey, I focused on **configuring alerts in Prometheus** and displaying them in **Grafana**. This ensures that I’m immediately notified when critical metrics cross thresholds, improving system reliability and proactive monitoring.

---

### 🔹 What I Implemented:

1️⃣ **Prometheus Alert Rules**
- Defined thresholds for key metrics:
  - CPU usage > 80%
  - Memory usage > 75%
- Created `alert.rules.yml` to manage these rules.
- Integrated the rules into `prometheus.yml`.

2️⃣ **Alerting Workflow**
- Prometheus continuously scrapes metrics from my Node.js application.
- When thresholds are breached, Prometheus fires alerts.
- Alerts are visible in Grafana dashboards.

3️⃣ **Grafana Dashboards**
- Created dashboards for:
  - CPU Usage
  - Memory Usage
  - Active Alerts
- Alerts are highlighted in real-time, making it easy to monitor system health.

---

### ⚡ Key Benefits:

- **Proactive Monitoring**: Get notified before issues escalate.
- **Visual Insights**: Grafana dashboards provide clear visualization of metrics and alerts.
- **Scalable Setup**: This can be extended to multiple services and applications.
- **Hands-on Learning**: Great way to understand real-world monitoring and alerting workflows.

---


💡 **Takeaway**: Combining **Prometheus alerts** with **Grafana visualization** ensures you can monitor your application metrics in real-time and respond quickly to potential issues. This is a critical skill for DevOps, SRE, and cloud engineers.

#DevOps #Monitoring #Prometheus #Grafana #Alerts #CloudEngineering #NodeJS #SystemReliability
