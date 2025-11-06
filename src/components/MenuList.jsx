import { useRef } from 'react';

function MenuCard({ item, isAdmin, onAdd, onChangeImage }) {
  const inputRef = useRef(null);
  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
      {item.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
      ) : (
        <div className="w-full h-40 bg-slate-100 flex items-center justify-center text-slate-500 text-sm">Gambar tidak tersedia</div>
      )}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-800">{item.name}</h3>
            <p className="text-sm text-slate-500">Rp{item.price.toLocaleString('id-ID')}</p>
          </div>
          {!isAdmin && (
            <button onClick={() => onAdd(item)} className="px-3 py-1.5 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700">Tambah</button>
          )}
        </div>

        {isAdmin && (
          <div className="mt-3">
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => onChangeImage(item.id, e.target.files?.[0] || null)} />
            <button onClick={() => inputRef.current?.click()} className="px-3 py-1.5 rounded-md border text-sm hover:bg-slate-50">{item.image ? 'Ganti' : 'Tambah'} Gambar</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MenuList({ items, isAdmin, onAddToOrder, onChangeItemImage }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((it) => (
        <MenuCard key={it.id} item={it} isAdmin={isAdmin} onAdd={onAddToOrder} onChangeImage={onChangeItemImage} />
      ))}
    </div>
  );
}
