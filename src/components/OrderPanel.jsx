import React, { useState } from 'react';

function OrderItemRow({ idx, item, onChange, onRemove }) {
  return (
    <div className="grid grid-cols-12 gap-2 items-end">
      <div className="col-span-6">
        <label className="block text-xs text-gray-500 mb-1">Nama Pesanan</label>
        <input
          value={item.name}
          onChange={(e) => onChange({ ...item, name: e.target.value })}
          className="w-full rounded-lg border px-3 py-2"
          placeholder="Contoh: Nasi Goreng Ayam"
        />
      </div>
      <div className="col-span-3">
        <label className="block text-xs text-gray-500 mb-1">Jumlah</label>
        <input
          type="number"
          min={1}
          value={item.qty}
          onChange={(e) => onChange({ ...item, qty: Math.max(1, Number(e.target.value)) })}
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>
      <div className="col-span-3">
        <label className="block text-xs text-gray-500 mb-1">Harga Satuan</label>
        <input
          type="number"
          min={0}
          value={item.price}
          onChange={(e) => onChange({ ...item, price: Math.max(0, Number(e.target.value)) })}
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>
      <div className="col-span-12 flex justify-between items-center mt-1">
        <div className="text-xs text-gray-600">Subtotal: Rp {(item.price * item.qty).toLocaleString('id-ID')}</div>
        {onRemove && (
          <button onClick={onRemove} className="text-sm text-red-600 hover:underline">Hapus</button>
        )}
      </div>
    </div>
  );
}

function Checkout({ orderItems, onPaid }) {
  const [paid, setPaid] = useState(0);
  const total = orderItems.reduce((s, i) => s + i.price * i.qty, 0);
  const change = Math.max(0, paid - total);

  return (
    <div className="space-y-3">
      <div>
        <div className="text-lg font-semibold">Nasi Goreng Rasy</div>
        <div className="text-sm text-gray-600">Jl. Kamarung RT 04 RW 05</div>
      </div>
      <div className="border rounded-lg p-3 bg-white">
        <div className="font-medium mb-2">Ringkasan</div>
        <ul className="text-sm space-y-1">
          {orderItems.map((i, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{i.name} × {i.qty}</span>
              <span>Rp {(i.price * i.qty).toLocaleString('id-ID')}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between border-t pt-2 mt-2 font-semibold">
          <span>Total</span>
          <span>Rp {total.toLocaleString('id-ID')}</span>
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Jumlah uang dibayarkan</label>
        <input
          type="number"
          value={paid}
          onChange={(e) => setPaid(Number(e.target.value))}
          className="w-full rounded-lg border px-3 py-2"
        />
        <div className="text-sm text-gray-700 mt-1">Kembalian: <span className="font-semibold">Rp {change.toLocaleString('id-ID')}</span></div>
      </div>

      <button
        disabled={total === 0 || paid < total}
        onClick={() => onPaid({ total, paid, change })}
        className="w-full py-2 rounded-lg bg-emerald-600 text-white font-medium disabled:opacity-50"
      >
        Bayar
      </button>
    </div>
  );
}

export default function OrderPanel({ onCreateOrder }) {
  const [items, setItems] = useState([
    { name: '', qty: 1, price: 0 },
  ]);
  const [checkoutMode, setCheckoutMode] = useState(false);

  const addItem = () => setItems([...items, { name: '', qty: 1, price: 0 }]);
  const updateItem = (idx, val) => setItems(items.map((it, i) => (i === idx ? val : it)));
  const removeItem = (idx) => setItems(items.filter((_, i) => i !== idx));

  const canCheckout = items.every((i) => i.name.trim() && i.qty > 0);

  return (
    <div className="max-w-3xl mx-auto p-4">
      {!checkoutMode ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Buat Pesanan</h2>
          <div className="space-y-4">
            {items.map((it, idx) => (
              <div key={idx} className="border rounded-xl p-3 bg-white">
                <OrderItemRow
                  idx={idx}
                  item={it}
                  onChange={(val) => updateItem(idx, val)}
                  onRemove={items.length > 1 ? () => removeItem(idx) : undefined}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={addItem} className="px-4 py-2 rounded-lg border">Tambah Pesanan</button>
            <button
              onClick={() => setCheckoutMode(true)}
              disabled={!canCheckout}
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white disabled:opacity-50"
            >
              Pesan
            </button>
          </div>
        </div>
      ) : (
        <Checkout
          orderItems={items}
          onPaid={(payment) => {
            onCreateOrder({ items, payment, status: 'dibuat', createdAt: new Date().toISOString() });
            setItems([{ name: '', qty: 1, price: 0 }]);
            setCheckoutMode(false);
          }}
        />
      )}
    </div>
  );
}
