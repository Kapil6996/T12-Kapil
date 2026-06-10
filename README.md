# GO-BRICS Lead Capture Automation — Workflow Documentation

An interactive, premium React documentation dashboard built for **GO-BRICS Business Lab**. This application maps and visualizes the live multi-step automation workflow that captures B2B leads from LinkedIn, enriches profile data, enters contacts into HubSpot CRM, sends email & Slack alerts, and logs runs to Google Sheets.

This documentation workspace serves as a live monitor, troubleshooting manual, and operational blueprint for the GO-BRICS Business Lab technical and sales operations teams.

---

## 🛠️ Project Metadata

- **Task ID**: `TASK_T12`
- **Workflow Scope**: Lead Capture to CRM Integration
- **Evaluation Grade**: Grade A
- **Value**: 170 GBP
- **Deployment Platform**: Zapier Cloud
- **Current Operational Status**: ✅ Live / Active

---

## 🎨 Design System & Aesthetics

The application is built around high-fidelity corporate cyberpunk aesthetics:
- **Primary Background**: Jet Black (`#0A0A0A`)
- **Accent Highlight**: Matrix Neon Green (`#00FF41`)
- **Card Background**: Deep Charcoal (`#1A1A1A`)
- **Borders & Dividers**: Slate/Charcoal (`#2E2E2E`)
- **Typography**: Inter (via Google Fonts)
- **Log Monospace font**: JetBrains Mono

---

## 📋 Interactive Sections (4 Tabs)

### 1. Tab 1 — Overview
- **Workflow Status Card**: Displays main system details, trigger types, success rate (96.8%), and average execution times (4.1s).
- **KPI Metrics Grid**: High-level counters for Steps, Avg Run Time, Success Rate, and Leads Captured.
- **Business Impact metrics**: Highlights time saved (8 hrs/week), capture counts, and CRM data accuracy (100%).
- **Integrations Hub**: Displays connection state badges for LinkedIn, Zapier, HubSpot CRM, Gmail, and Slack.

### 2. Tab 2 — Flow Diagram
- Renders an interactive vertical flowchart charting the 6 steps of the lead acquisition pipeline.
- **Collapsible Detail Cards**: Clicking any step toggles technical descriptions, webhook details, and raw API JSON payload mockups.
- **Error Branching**: Highlights red branching logic in the Enrichment stage, indicating how incomplete profiles are routed out of the pipeline.

### 3. Tab 3 — Test Run Log
- Displays performance metrics for recent test executions (12 runs).
- **Filtered Table**: Search records by Lead Name or Company, and filter by status badges (Success, Flagged, Retried).
- **CSV Exporter**: Downloads a formatted CSV file of all log entries directly using in-memory `Blob` generation.

### 4. Tab 4 — Error Handling & SOPs
- **Exception Cards**: Contains trigger conditions and remediation paths for 4 common failures (Incomplete Profiles, HubSpot Rate Limits, Duplicate Emails, Slack webhook offline).
- **Monitoring Box**: A terminal-style Standard Operating Procedure (SOP) guiding team members on verifying Zapier logs and monthly audits.

---

## 🖨️ Print Optimization

The application contains print-friendly CSS overrides (`@media print` rules):
- Hides the navigation tab bar, search filters, and action buttons (`.no-print` helper).
- Converts the color scheme to high-contrast black text on a clean white background.
- Lays out all 4 tabs sequentially on separate pages (`.print-force-block`), allowing you to export the entire dashboard into a structured A4 PDF booklet by clicking **Download PDF Report**.

---

## 💻 Tech Stack

- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Compilation**: Vite Bundler

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Kapil6996/T12-Kapil.git
   cd T12-Kapil
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server
Run the local dev server:
```bash
npm run dev
```

### Production Build
Build the optimized static assets:
```bash
npm run build
```
The compiled files will be output to the `dist/` directory, ready to be served by any static hosting platform.
