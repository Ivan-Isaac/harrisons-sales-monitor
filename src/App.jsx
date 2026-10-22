// src/App.jsx
import { useEffect, useState, useCallback } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { getSalesOrders, getSalesOrdersMeta } from './services/api';
import KPICards from './components/KPICards';
import StatusChart from './components/StatusChart';
import FilterBar from './components/FilterBar';
import OrdersTable from './components/OrdersTable';

export default function App() {
  // Metadata state (facets for sites and statuses)
  const [meta, setMeta] = useState(null);

  // Orders data and summary state
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState(null);
  const [totalPages, setPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  // Query & filter states
  const [site, setSite] = useState('ALL');
  const [status, setStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // UX states
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Debounce free-text search (350ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset to page 1 on new search
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Load API metadata once on mount
  useEffect(() => {
    async function loadMeta() {
      try {
        const metaRes = await getSalesOrdersMeta();
        setMeta(metaRes);
      } catch (err) {
        console.error('Failed to load API metadata:', err);
      }
    }
    loadMeta();
  }, []);

  // Fetch orders based on active filters and pagination
  const fetchOrders = useCallback(async (isBackgroundRefresh = false) => {
    try {
      if (isBackgroundRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const res = await getSalesOrders({
        page,
        pageSize,
        site: site === 'ALL' ? undefined : site,
        status: status === 'ALL' ? undefined : status,
        q: debouncedSearch || undefined,
      });

      setOrders(res.data || []);
      setSummary(res.summary || null);
      setPages(res.totalPages || 1);
      setTotalOrders(res.total || 0);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Failed to connect to the mock API server.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [page, pageSize, site, status, debouncedSearch]);

  // Trigger fetch whenever filter dependencies change
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Handlers
  const handleSiteChange = (newSite) => {
    setSite(newSite);
    setPage(1);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSite('ALL');
    setStatus('ALL');
    setSearchQuery('');
    setDebouncedSearch('');
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased pb-12">
      {/* Top Navigation & Brand Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              H
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                Harrisons Sabah — Sales Order Monitor
              </h1>
              <p className="text-xs text-slate-500">
                MIS Operations & Regional Branch Logistics Hub
              </p>
            </div>
          </div>

          {/* Sync status & Refresh trigger */}
          <div className="flex items-center gap-3 text-xs text-slate-500 self-end sm:self-auto">
            <span className="hidden md:inline">
              Last synced: {lastUpdated.toLocaleTimeString()}
            </span>
            <button
              onClick={() => fetchOrders(true)}
              disabled={loading || refreshing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors cursor-pointer shadow-xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Error Alert Banner */}
        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-800 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">
              <span className="font-semibold">Network or API Error:</span> {error}
            </div>
            <button
              onClick={() => fetchOrders()}
              className="text-xs font-semibold underline hover:text-rose-950"
            >
              Retry
            </button>
          </div>
        )}

        {/* 1. Summary KPI Cards */}
        <KPICards summary={summary} loading={loading && !refreshing} />

        {/* 2. Visual Status Breakdown Chart */}
        <StatusChart summary={summary} loading={loading && !refreshing} />

        {/* 3. Search and Multi-filter Controls */}
        <FilterBar
          sites={meta?.facets?.sites || []}
          statuses={meta?.facets?.statuses || []}
          selectedSite={site}
          selectedStatus={status}
          searchQuery={searchQuery}
          onSiteChange={handleSiteChange}
          onStatusChange={handleStatusChange}
          onSearchChange={setSearchQuery}
          onResetFilters={handleResetFilters}
          loading={loading && !refreshing}
        />

        {/* 4. Sales Orders Table & Pagination */}
        <OrdersTable
          orders={orders}
          loading={loading && !refreshing}
          page={page}
          pageSize={pageSize}
          totalOrders={totalOrders}
          totalPages={totalPages}
          onPageChange={setPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPage(1);
          }}
        />
      </main>
    </div>
  );
}