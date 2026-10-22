// src/components/StatusChart.jsx
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const STATUS_COLORS = {
  'Open order': '#f59e0b', // Amber
  'Invoiced': '#3b82f6',   // Blue
  'Delivered': '#0d9488',  // Teal
  'Cancelled': '#f43f5e',  // Rose
};

export default function StatusChart({ summary, loading }) {
  if (loading) {
    return (
      <div className="h-64 rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex items-center justify-center">
        <div className="h-40 w-full bg-slate-100 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  const chartData = [
    { name: 'Open order', count: summary?.open_orders || 0 },
    { name: 'Invoiced', count: summary?.invoiced_orders || 0 },
    { name: 'Delivered', count: summary?.delivered_orders || 0 },
    { name: 'Cancelled', count: summary?.cancelled_orders || 0 },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Order Status Distribution</h3>
          <p className="text-xs text-slate-500 mt-0.5">Real-time volume breakdown by lifecycle stage</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
          {summary?.filtered_orders ?? summary?.total_orders ?? 0} Total Evaluated
        </span>
      </div>

      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="name"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: 'rgba(241, 245, 249, 0.6)' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-md text-xs">
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="text-slate-600 mt-0.5">
                        <span className="font-bold text-slate-900">{item.count}</span> orders
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {chartData.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={STATUS_COLORS[entry.name] || '#94a3b8'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}