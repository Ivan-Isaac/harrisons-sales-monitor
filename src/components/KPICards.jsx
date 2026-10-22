// src/components/KPICards.jsx
import { Package, Clock, CheckCircle2, FileText, XCircle, DollarSign } from 'lucide-react';
import { formatMYR } from '../utils/helpers';

export default function KPICards({ summary, loading }) {
  const cards = [
    {
      title: 'Total Order Value',
      value: formatMYR(summary?.total_order_value),
      subtitle: `${summary?.filtered_orders ?? summary?.total_orders ?? 0} orders accounted`,
      icon: DollarSign,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      iconColor: 'text-emerald-600',
    },
    {
      title: 'Open / Pending',
      value: summary?.open_orders ?? 0,
      subtitle: 'Awaiting fulfillment',
      icon: Clock,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      iconColor: 'text-amber-600',
    },
    {
      title: 'Invoiced Orders',
      value: summary?.invoiced_orders ?? 0,
      subtitle: 'Processed & billed',
      icon: FileText,
      color: 'text-blue-700 bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Delivered Orders',
      value: summary?.delivered_orders ?? 0,
      subtitle: 'Completed shipments',
      icon: CheckCircle2,
      color: 'text-teal-700 bg-teal-50 border-teal-200',
      iconColor: 'text-teal-600',
    },
    {
      title: 'Cancelled Orders',
      value: summary?.cancelled_orders ?? 0,
      subtitle: 'Voided / refunded',
      icon: XCircle,
      color: 'text-rose-700 bg-rose-50 border-rose-200',
      iconColor: 'text-rose-600',
    },
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col justify-between transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {card.title}
              </span>
              <div className={`p-2 rounded-lg ${card.color}`}>
                <Icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>
            </div>

            <div className="mt-3">
              {loading ? (
                <div className="h-7 w-24 bg-slate-200 animate-pulse rounded"></div>
              ) : (
                <p className="text-2xl font-bold text-slate-900">{card.value}</p>
              )}
              <p className="text-xs text-slate-500 mt-1">{card.subtitle}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}