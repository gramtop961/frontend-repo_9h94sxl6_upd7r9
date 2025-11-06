export default function HistoryPanel({ orders, isAdmin, onToggleDone }) {
  return (
    <div className="space-y-3">
      {orders.length === 0 && (
        <div className="p-6 text-center text-slate-500 bg-white border rounded-xl">Belum ada riwayat pesanan</div>
      )}
      {orders.map((o) => (
        <div key={o.id} className="p-4 bg-white border rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">{new Date(o.createdAt).toLocaleString('id-ID')}</div>
              <div className="text-sm text-slate-500">{o.items.map((i) => `${i.qty}x ${i.name}`).join(', ')}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold">Rp{o.total.toLocaleString('id-ID')}</div>
              <div className={`text-xs mt-1 ${o.status === 'selesai' ? 'text-emerald-700' : 'text-amber-700'}`}>{o.status === 'selesai' ? 'Telah diproses' : 'Sedang dibuat'}</div>
            </div>
          </div>
          {isAdmin && (
            <div className="mt-3">
              <button onClick={() => onToggleDone(o.id)} className="px-3 py-1.5 rounded-md border hover:bg-slate-50 text-sm">Tandai {o.status === 'selesai' ? 'Belum' : 'Selesai'}</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
