# Node.js + Prometheus Monitoring Demo

## Setup Instructions

1. Install Node.js (v14+ recommended)
2. Clone this repository
3. Navigate to project folder and install dependencies:
   npm install
4. Run the Node.js app:
   npm start
5. Download and extract Prometheus:
   wget https://github.com/prometheus/prometheus/releases/download/v2.49.0/prometheus-2.49.0.linux-amd64.tar.gz
   tar xvfz prometheus-2.49.0.linux-amd64.tar.gz
6. Copy `prometheus.yml` into Prometheus folder
7. Run Prometheus:
   ./prometheus --config.file=prometheus.yml
8. Open Prometheus in browser: http://localhost:9090/targets
   - Verify that the nodejs_app job is UP
9. Explore metrics:
   - http://localhost:3000/metrics

## Notes
- Prometheus scrapes metrics from Node.js app every 15 seconds
- Extend with Grafana for visualization
- Add alerts for production monitoring
