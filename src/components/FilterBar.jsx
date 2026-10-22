// src/components/FilterBar.jsx
import { Search, RotateCcw, Filter, Building2 } from 'lucide-react';
import { SITE_LABELS } from '../utils/helpers';

export default function FilterBar({
  sites = [],
  statuses = [],
  selectedSite,
  selectedStatus,
  searchQuery,
  onSiteChange,
  onStatusChange,
  onSearchChange,
  onResetFilters,
  loading,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input (SalesId, Customer, SalesTaker) */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by Sales ID, Customer Name, Account..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-300 bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Sabah Branch / Site Selector */}
        <div className="relative min-w-[220px]">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={selectedSite}
            onChange={(e) => onSiteChange(e.target.value)}
            disabled={loading}
            className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer font-medium"
          >
            <option value="ALL">All Sabah Branches</option>
            {sites.map((site) => (
              <option key={site.value} value={site.value}>
                {SITE_LABELS[site.value] || `Branch ${site.value}`} ({site.count})
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
            ▼
          </div>
        </div>

        {/* Order Status Selector */}
        <div className="relative min-w-[180px]">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            disabled={loading}
            className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer font-medium"
          >
            <option value="ALL">All Statuses</option>
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.value} ({status.count})
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
            ▼
          </div>
        </div>

        {/* Reset Filter Button */}
        <button
          onClick={onResetFilters}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-lg transition-colors"
          title="Reset all filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>
  );
}