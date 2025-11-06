import { useMemo, useState } from 'react';

export default function OrderPanel({ menuItems, onCreateOrder }) {
  const [lines, setLines] = useState([]);
  const [step, setStep] = useState('build'); // 'build' | 'pay'
  const [paid, setPaid] = useState('');

  const total = useMemo(() => lines.reduce((sum, l) => sum + (l.qty || 0) * (l.price || 0), 0), [lines]);
  const change = useMemo(() => {
    const p = Number(paid || 0);
    return p - total;
  }, [paid, total]);

  const addLineFromMenu = (item) => {
    setLines((prev) => [...prev, { name: item.name, price: item.price, qty: 1 }]);
  };

  const updateLine = (idx, patch) => {
    setLines((prev) => prev.map((l, i) => (i === idx ? { ...l, ...patch } : l)));
  };

  const removeLine = (idx) => setLines((prev) => prev.filter((_, i) => i !== idx));

  const proceed = () => {
    if (total <= 0) return;
    setStep('pay');
  };

  const pay = () => {
    if (change < 0) return;
    const order = {
      id: Date.now().toString(),
      items: lines,
      total,
      status: 'dibuat',
      createdAt: new Date().toISOString(),
    };
    onCreateOrder(order);
    setLines([]);
    setPaid('');
    setStep('build');
  };

  return (
    <div className="space-y-4">
      {step === 'build' && (
        <div className="space-y-3">
          <div className="p-4 bg-white border rounded-xl">
            <h3 className="font-semibold mb-3">Tambahkan Item</h3>
            <div className="flex flex-col gap-2">
              {lines.map((l, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                  <input className="col-span-5 rounded-md border px-3 py-2" value={l.name} onChange={(e) => updateLine(idx, { name: e.target.value })} placeholder="Nama menu" />
                  <input type="number" className="col-span-2 rounded-md border px-3 py-2" value={l.qty} onChange={(e) => updateLine(idx, { qty: Number(e.target.value) })} placeholder="Qty" />
                  <input type="number" className="col-span-3 rounded-md border px-3 py-2" value={l.price} onChange={(e) => updateLine(idx, { price: Number(e.target.value) })} placeholder="Harga" />
                  <button onClick={() => removeLine(idx)} className="col-span-2 px-3 py-2 rounded-md border text-red-600">Hapus</button>
                </div>
              ))}
              <button onClick={() => setLines((p) => [...p, { name: '', qty: 1, price: 0 }])} className="self-start px-3 py-2 rounded-md border">+ Tambah Baris</button>
            </div>
          </div>

          <div className="p-4 bg-white border rounded-xl">
            <h3 className="font-semibold mb-3">Pilih dari Menu</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {menuItems.map((m) => (
                <button key={m.id} onClick={() => addLineFromMenu(m)} className="px-3 py-2 rounded-md border hover:bg-slate-50 text-left">
                  <div className="font-medium">{m.name}</div>
                  <div className="text-sm text-slate-500">Rp{m.price.toLocaleString('id-ID')}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Total: Rp{total.toLocaleString('id-ID')}</div>
            <button onClick={proceed} className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">Pesan</button>
          </div>
        </div>
      )}

      {step === 'pay' && (
        <div className="space-y-4">
          <div className="p-4 bg-white border rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold">NR</div>
              <div>
                <h2 className="font-semibold">Nasi Goreng Rasy</h2>
                <p className="text-sm text-slate-500">Jl. Kamarung RT 04 RW 05</p>
              </div>
            </div>
            <div className="mt-4 space-y-1 text-sm">
              {lines.map((l, i) => (
                <div key={i} className="flex justify-between">
                  <span>{l.qty}x {l.name}</span>
                  <span>Rp{(l.qty * l.price).toLocaleString('id-ID')}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold pt-2 border-t mt-2">
                <span>Total</span>
                <span>Rp{total.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
            <div>
              <label className="block text-sm text-slate-600">Bayar</label>
              <input type="number" value={paid} onChange={(e) => setPaid(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" placeholder="Jumlah uang" />
            </div>
            <div>
              <label className="block text-sm text-slate-600">Kembalian</label>
              <div className="mt-1 h-10 flex items-center px-3 rounded-md border bg-slate-50">Rp{Math.max(change, 0).toLocaleString('id-ID')}</div>
            </div>
            <button onClick={pay} disabled={change < 0} className={`h-10 rounded-md ${change < 0 ? 'bg-slate-200 text-slate-500' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>Bayar</button>
          </div>
        </div>
      )}
    </div>
  );
}
