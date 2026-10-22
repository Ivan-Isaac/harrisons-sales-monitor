// src/components/OrdersTable.jsx
import { AlertTriangle, ChevronLeft, ChevronRight, Inbox } from 'lucide-react';
import { formatMYR, formatDate, isOrderDelayed, SITE_LABELS } from '../utils/helpers';

const STATUS_BADGES = {
  'Open order': 'bg-amber-50 text-amber-700 border-amber-200',
  'Invoiced': 'bg-blue-50 text-blue-700 border-blue-200',
  'Delivered': 'bg-teal-50 text-teal-700 border-teal-200',
  'Cancelled': 'bg-rose-50 text-rose-700 border-rose-200',
};

export default function OrdersTable({
  orders = [],
  loading,
  page,
  pageSize,
  totalOrders,
  totalPages,
  onPageChange,
  onPageSizeChange,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col justify-between">
      {/* Table Header & Quick Info */}
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
        <div>
          <h3 className="text-base font-bold text-slate-900">Sales Orders Ledger</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Showing {orders.length > 0 ? (page - 1) * pageSize + 1 : 0} to{' '}
            {Math.min(page * pageSize, totalOrders)} of {totalOrders.toLocaleString()} records
          </p>
        </div>

        {/* Page Size Selector */}
        <div className="flex items-center gap-2 text-xs text-slate-600 self-end sm:self-auto">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="rounded border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {/* Main Table Responsive Container */}
      <div className="overflow-x-auto min-h-[360px]">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100/75 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <th className="py-3 px-4">Sales ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Branch / Site</th>
              <th className="py-3 px-4">Order Date</th>
              <th className="py-3 px-4 text-right">Amount</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Operational SLA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {loading ? (
              // Loading Skeleton Rows
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={`skeleton-${i}`} className="animate-pulse">
                  <td className="py-3.5 px-4"><div className="h-4 w-24 bg-slate-200 rounded"></div></td>
                  <td className="py-3.5 px-4"><div className="h-4 w-40 bg-slate-200 rounded"></div></td>
                  <td className="py-3.5 px-4"><div className="h-4 w-28 bg-slate-200 rounded"></div></td>
                  <td className="py-3.5 px-4"><div className="h-4 w-20 bg-slate-200 rounded"></div></td>
                  <td className="py-3.5 px-4 text-right"><div className="h-4 w-20 bg-slate-200 rounded ml-auto"></div></td>
                  <td className="py-3.5 px-4 text-center"><div className="h-6 w-20 bg-slate-200 rounded-full mx-auto"></div></td>
                  <td className="py-3.5 px-4 text-center"><div className="h-4 w-16 bg-slate-200 rounded mx-auto"></div></td>
                </tr>
              ))
            ) : orders.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan={7} className="py-16 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center">
                    <Inbox className="w-10 h-10 text-slate-300 stroke-1 mb-2" />
                    <p className="text-sm font-semibold text-slate-600">No sales orders found</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm">
                      Try modifying your branch filter, status selection, or clearing your search term.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              // Active Data Rows
              orders.map((order) => {
                const delayed = isOrderDelayed(order.SalesStatus, order.CreatedDateTime1);

                return (
                  <tr
                    key={order.SalesId}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    {/* Sales ID */}
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {order.SalesId}
                    </td>

                    {/* Customer Info */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">{order.SalesName}</div>
                      <div className="text-xs text-slate-400">Acc: {order.CustAccount}</div>
                    </td>

                    {/* Branch / Site */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {order.InventSiteId}
                      </span>
                      <span className="ml-2 text-xs text-slate-500">
                        {order.SalesDistrictDescription || SITE_LABELS[order.InventSiteId] || '-'}
                      </span>
                    </td>

                    {/* Created Date */}
                    <td className="py-3.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                      {formatDate(order.CreatedDateTime1)}
                    </td>

                    {/* Order Amount */}
                    <td className="py-3.5 px-4 text-right font-semibold text-slate-900 whitespace-nowrap">
                      {formatMYR(order.HAR_TotalSOAmount)}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                          STATUS_BADGES[order.SalesStatus] || 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {order.SalesStatus}
                      </span>
                    </td>

                    {/* Operational SLA / Delay Tag */}
                    <td className="py-3.5 px-4 text-center">
                      {delayed ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full animate-pulse">
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                          Delayed (&gt;3d)
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 font-normal">Normal</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50">
        <span className="text-xs text-slate-500">
          Page <span className="font-semibold text-slate-800">{page}</span> of{' '}
          <span className="font-semibold text-slate-800">{totalPages || 1}</span>
        </span>

        <div className="inline-flex items-center gap-2">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1 || loading}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Previous
          </button>

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages || loading}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            Next
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}