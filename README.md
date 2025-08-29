```
Monitoring-NodeJs-Prometheus-Grafana/
│
├── task01-prometheus-integration/
│   ├── README.md
│   ├── app.js
│   ├── package.json
│   └── prometheus.yml
│
├── task02-grafana-dashboard/
│   ├── README.md
│   ├── app.js                 # copy from task01
│   ├── package.json           # copy from task01
│   ├── prometheus.yml         # copy from task01
│   ├── dashboard.json
│   ├── dashboards.yaml
│   └── datasources.yaml
│
└── task03-prometheus-alerts/
    ├── README.md
    ├── app.js                 # copy from task01
    ├── package.json           # copy from task01
    ├── prometheus.yml         # updated for alerts
    ├── alert.rules.yml
    ├── grafana-dashboards.yaml
    ├── grafana-datasources.yaml
    └── dashboard.json
```


---

## ✅ Step 1: Task 1 – Prometheus Integration

**Folder:** `task01-prometheus-integration/`
**Files:**

* `app.js` → Node.js app exposing `/metrics` (with custom and default metrics)
* `package.json` → Node.js dependencies
* `prometheus.yml` → Scrape config
* `README.md` → Setup guide for Task 1

**Goal:** Standalone Prometheus + Node.js monitoring setup.

---

## ✅ Step 2: Task 2 – Grafana Dashboard

**Folder:** `task02-grafana-dashboard/`
**Files:**

* Copy from Task 1: `app.js`, `package.json`, `prometheus.yml`
* `dashboard.json` → Exported Grafana dashboard
* `dashboards.yaml` → Grafana provisioning config for dashboards
* `datasources.yaml` → Grafana data source config
* `README.md` → Setup guide including importing dashboard

**Goal:** Add Grafana visualization on top of Task 1.

---

## ✅ Step 3: Task 3 – Prometheus Alerts

**Folder:** `task03-prometheus-alerts/`
**Files:**

* Copy from Task 1: `app.js`, `package.json`
* `prometheus.yml` → Updated for alerting rules
* `alert.rules.yml` → Define CPU/memory alert thresholds
* `grafana-dashboards.yaml` → Provision Grafana dashboard including alerts
* `grafana-datasources.yaml` → Provision Grafana data sources
* `dashboard.json` → Updated with alert panels
* `README.md` → Step-by-step guide for Task 3

**Goal:** Add alerting to Task 2 setup.

---

## 📌 Key Points for Clean Management

1. **Copy full working files from the previous task** to the next task folder.

   * Don’t rely on deltas; each task folder should run standalone.
2. **Update only necessary files** for the current task (like `prometheus.yml` for alerts in Task 3).
3. **README in each folder** explains:

   * What this task demonstrates
   * How to set up and run it
   * Key changes from the previous task
4. Optional: Add a `full-stack/` folder combining Task 3 for users who want the complete solution.

---
