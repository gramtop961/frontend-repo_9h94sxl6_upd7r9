import React from 'react';

export default function HistoryPanel({ orders, isAdmin, onToggleDone }) {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Riwayat Pesanan</h2>
      <div className="space-y-3">
        {orders.length === 0 && (
          <div className="text-sm text-gray-600">Belum ada pesanan.</div>
        )}
        {orders.map((o, idx) => (
          <div key={idx} className="border rounded-xl p-3 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{new Date(o.createdAt).toLocaleString('id-ID')}</div>
                <div className="text-sm text-gray-600">
                  {o.items.map((i) => `${i.name} × ${i.qty}`).join(', ')}
                </div>
                <div className="text-sm font-semibold text-emerald-700">Total: Rp {o.payment.total.toLocaleString('id-ID')}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm px-2 py-1 rounded ${o.status === 'selesai' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                  {o.status === 'selesai' ? 'Telah diproses' : 'Sedang dibuat'}
                </span>
                {isAdmin && (
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={o.status === 'selesai'}
                      onChange={() => onToggleDone(idx)}
                    />
                    <span>Tandai selesai</span>
                  </label>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
