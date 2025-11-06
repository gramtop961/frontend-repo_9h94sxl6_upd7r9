import React from 'react';

export default function MenuList({ items, isAdmin, onAddItem }) {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">List Menu</h2>
        {isAdmin && (
          <button
            onClick={onAddItem}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Tambah Menu
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((m) => (
          <div key={m.id} className="border rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="h-36 bg-gray-100">
              {m.image ? (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img src={m.image} alt={`gambar ${m.name}`} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full grid place-items-center text-gray-500 text-sm">Gambar tidak tersedia</div>
              )}
            </div>
            <div className="p-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{m.name}</div>
                <div className="text-sm text-emerald-700 font-semibold">Rp {m.price.toLocaleString('id-ID')}</div>
              </div>
              {m.popular && <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded">Favorit</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
