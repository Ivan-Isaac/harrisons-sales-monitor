# Harrisons Sabah — Sales Order Monitoring Dashboard

An enterprise web application developed for the Harrisons Sabah Sdn. Bhd. MIS Department technical assessment. The application provides regional sales order monitoring, branch-level filtering, real-time KPI aggregations, and operational SLA delay tracking across Sabah distribution hubs.

---

## Live Demo & Repository
- **Live Web App:** https://harrisons-sales-monitor.vercel.app
- **GitHub Repository:** https://github.com/Ivan-Isaac/harrisons-sales-monitor

---

## Key Features

1. **Executive Dashboard & Real-Time KPIs:**
   - Displays aggregated figures for Total Order Value (MYR), Open/Pending Orders, Invoiced Orders, Delivered Orders, and Cancelled Orders directly from API summary payloads.
   - Interactive bar chart breakdown visualizing distribution across order lifecycle states using `recharts`.

2. **Regional Branch & Status Filtering:**
   - Multi-branch filtering supporting all regional Sabah distribution sites (`KK01`, `SDK02`, `TWU03`, `A10`, `B20`, `C30`, `D40`, `E50`) and aggregate statewide views.
   - Server-side status filters (`Open order`, `Invoiced`, `Delivered`, `Cancelled`).

3. **Debounced Server-Side Search:**
   - Real-time search across `SalesId`, `SalesName`, `CustAccount`, and `SalesTaker` with a 350ms debounce window to prevent redundant network requests and avoid API rate limits.

4. **Operational SLA & Delay Tagging:**
   - Automatically evaluates `CreatedDateTime1` on open orders. Any order in `Open order` status older than 3 calendar days is flagged with an urgent `⚠️ Delayed (>3d)` badge to mitigate fulfillment bottlenecks.

5. **Resilient UX States:**
   - Animated skeleton loading states during API transitions.
   - Empty state handling with quick filter-reset actions.
   - Network error banners with manual retry capabilities and background refresh triggers.

---

## Tech Stack
- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS
- **Data Visualization:** Recharts
- **Icons:** Lucide React
- **API Client:** Native Fetch API with custom header authorization (`x-assessment-key`)

---

## Local Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ivan-Isaac/harrisons-sales-monitor
   cd harrisons-sales-monitor

2. **Clone the repository:**
   ```bash
   npm install

3. **Run development server:**
    ```bash
    npm run dev
    Open http://localhost:5173 in your browser.

4. **Build for production:**
    ```bash
    npm run build

## Architecture & API Integration Notes
- Decoupled API Client (src/services/api.js): Centralizes all HTTP communication against https://hiring.harrisons.my/api/mock/sales-orders. Automatically injects the x-assessment-key: hssb-assessment-mock-2026 header on every request.
- Server-Side Query Construction: Utilizes standard URL query parameters (page, pageSize, site, status, q) to delegate heavy filtering to the mock API server, reducing client-side compute overhead.
- Derived SLA State: Computes date differences on active records using clean helper utilities (src/utils/helpers.js) to provide immediate visual alerting without altering immutable API fixtures.

## AI Tools & Verification Disclosure
- Tools Utilized: Conversational LLM assistance was used for scaffolding component boilerplate, styling with Tailwind CSS utility classes, and structuring Recharts data formats.
- Verification & Logic Review:
    - Audited API parameter mappings to ensure server-side query keys (site, status, q) matched the /meta endpoint schema exactly.
    - Implemented and manually tested the 3-day SLA delay calculation against ISO date strings (CreatedDateTime1).
    - Added debouncing logic (350ms) to ensure search queries did not flood the server.
- Testing Approach: Conducted manual testing across all 8 branch sites, validated pagination boundaries, simulated empty search results, and verified layout responsiveness across desktop and mobile viewports.
