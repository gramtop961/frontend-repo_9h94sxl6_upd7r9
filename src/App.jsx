import React, { useMemo, useState } from 'react';
import TopBar from './components/TopBar.jsx';
import AuthGate from './components/AuthGate.jsx';
import MenuList from './components/MenuList.jsx';
import OrderPanel from './components/OrderPanel.jsx';
import HistoryPanel from './components/HistoryPanel.jsx';

// Demo data menu
const initialMenus = [
  { id: 1, name: 'Nasi Goreng Original', price: 15000, image: '', popular: true },
  { id: 2, name: 'Nasi Goreng Ayam', price: 20000, image: '', popular: false },
  { id: 3, name: 'Nasi Goreng Seafood', price: 25000, image: '', popular: true },
  { id: 4, name: 'Mie Goreng Spesial', price: 18000, image: '', popular: false },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('Pesan');
  const [menus, setMenus] = useState(initialMenus);
  const [orders, setOrders] = useState([]);

  const isAdmin = user?.role === 'admin';
  const effectiveTab = useMemo(() => {
    if (isAdmin && tab === 'Pesan') return 'Lihat Pesanan';
    return tab;
  }, [isAdmin, tab]);

  if (!user) {
    return (
      <AuthGate onAuthenticated={(u) => {
        setUser({ ...u, photoUrl: '' });
      }} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
      <TopBar
        currentTab={effectiveTab}
        setCurrentTab={setTab}
        user={user}
        onUpdateProfile={(u) => setUser((prev) => ({ ...prev, ...u }))}
        onLogout={() => {
          setUser(null);
          setTab('Pesan');
        }}
      />

      <main className="py-6">
        {effectiveTab === 'Pesan' && !isAdmin && (
          <OrderPanel
            onCreateOrder={(order) => {
              setOrders((prev) => [order, ...prev]);
              setTab('History');
            }}
          />
        )}

        {effectiveTab === 'Lihat Pesanan' && isAdmin && (
          <HistoryPanel
            orders={orders.filter((o) => o.status !== 'selesai')}
            isAdmin
            onToggleDone={(idx) => {
              const pending = orders.filter((o) => o.status !== 'selesai');
              const order = pending[idx];
              const originalIdx = orders.findIndex((o) => o === order);
              setOrders((prev) => prev.map((o, i) => i === originalIdx ? { ...o, status: o.status === 'selesai' ? 'dibuat' : 'selesai' } : o));
            }}
          />
        )}

        {effectiveTab === 'List Menu' && (
          <MenuList
            items={menus}
            isAdmin={isAdmin}
            onAddItem={() => {
              const name = prompt('Nama menu?');
              if (!name) return;
              const priceStr = prompt('Harga (angka)?');
              const price = Number(priceStr);
              const image = prompt('URL gambar (opsional)');
              setMenus((prev) => [
                ...prev,
                { id: prev.length ? prev[prev.length - 1].id + 1 : 1, name, price: isNaN(price) ? 0 : price, image: image || '', popular: false },
              ]);
            }}
          />
        )}

        {effectiveTab === 'History' && (
          <HistoryPanel
            orders={orders}
            isAdmin={isAdmin}
            onToggleDone={(idx) => {
              setOrders((prev) => prev.map((o, i) => i === idx ? { ...o, status: o.status === 'selesai' ? 'dibuat' : 'selesai' } : o));
            }}
          />
        )}
      </main>
    </div>
  );
}
