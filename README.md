# Harrisons Sabah — Sales Order Monitoring Dashboard

An enterprise web application developed for the Harrisons Sabah Sdn. Bhd. MIS Department technical assessment. The application provides regional sales order monitoring, branch-level filtering, real-time KPI aggregations, and operational SLA delay tracking across Sabah distribution hubs.

---

## Live Demo & Repository
- **Live Web App:** [Insert your Vercel URL after deployment]
- **GitHub Repository:** [Insert your GitHub repo URL]

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
   git clone <your-repo-url>
   cd harrisons-sales-monitor