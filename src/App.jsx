import { useMemo, useState } from 'react';
import AuthGate from './components/AuthGate.jsx';
import TopBar from './components/TopBar.jsx';
import MenuList from './components/MenuList.jsx';
import OrderPanel from './components/OrderPanel.jsx';
import HistoryPanel from './components/HistoryPanel.jsx';

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const DEFAULT_MENU = [
  { id: 'm1', name: 'Nasi Goreng Biasa', price: 15000, image: '' },
  { id: 'm2', name: 'Nasi Goreng Spesial', price: 20000, image: '' },
  { id: 'm3', name: 'Nasi Goreng Seafood', price: 23000, image: '' },
  { id: 'm4', name: 'Mie Goreng', price: 15000, image: '' },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('order');
  const [menu, setMenu] = useState(DEFAULT_MENU);
  const [orders, setOrders] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  const isAdmin = user?.role === 'admin';

  const visibleOrders = useMemo(() => {
    return isAdmin ? orders : orders.filter((o) => o.username === user?.username);
  }, [orders, isAdmin, user]);

  const handleCreateOrder = (order) => {
    setOrders((prev) => [{ ...order, username: user.username }, ...prev]);
    setActiveTab('history');
  };

  const handleToggleDone = (id) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: o.status === 'selesai' ? 'dibuat' : 'selesai' } : o)));
  };

  const handleAddToOrderFromMenu = (item) => {
    // This will be handled inside OrderPanel; kept for future extension
    console.log('Add to order from menu', item);
  };

  const handleChangeItemImage = async (id, file) => {
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setMenu((prev) => prev.map((m) => (m.id === id ? { ...m, image: dataUrl } : m)));
  };

  const openProfile = () => setShowProfile(true);
  const closeProfile = () => setShowProfile(false);

  const handleProfileFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setProfileFile(file);
    setProfilePreview(dataUrl);
  };

  const saveProfile = () => {
    if (!user) return;
    const photo = profilePreview || user.photo || null;
    setUser({ ...user, photo });
    setShowProfile(false);
  };

  const adminAddImagesBulk = () => {
    alert('Di setiap kartu menu sekarang ada tombol untuk menambahkan/ganti gambar. Klik "Tambah/Ganti Gambar" pada item yang diinginkan.');
  };

  if (!user) {
    return <AuthGate onAuth={setUser} />;
  }

  return (
    <div className="min-h-screen bg-emerald-50">
      <TopBar user={user} activeTab={activeTab} setActiveTab={setActiveTab} onOpenProfile={openProfile} onAdminAddImages={adminAddImagesBulk} />

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {activeTab === 'menu' && (
          <MenuList items={menu} isAdmin={isAdmin} onAddToOrder={handleAddToOrderFromMenu} onChangeItemImage={handleChangeItemImage} />
        )}

        {activeTab === 'order' && !isAdmin && (
          <OrderPanel menuItems={menu} onCreateOrder={handleCreateOrder} />
        )}

        {activeTab === 'adminOrders' && isAdmin && (
          <HistoryPanel orders={orders.filter((o) => o.status !== 'selesai')} isAdmin={true} onToggleDone={handleToggleDone} />
        )}

        {activeTab === 'history' && (
          <HistoryPanel orders={visibleOrders} isAdmin={isAdmin} onToggleDone={handleToggleDone} />
        )}
      </div>

      {showProfile && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-30">
          <div className="w-full max-w-md bg-white rounded-xl p-6">
            <h3 className="text-lg font-semibold">Edit Profil</h3>
            <div className="mt-4 flex items-center gap-4">
              <label className="w-20 h-20 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center cursor-pointer border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {profilePreview || user.photo ? (
                  <img src={profilePreview || user.photo} alt="profil" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-slate-500">Upload Foto</span>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleProfileFile} />
              </label>
              <div>
                <div className="text-sm text-slate-500">Foto diambil dari file lokal (bukan URL)</div>
                <div className="text-xs text-slate-400">Disimpan sebagai data URL pada sesi ini</div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={closeProfile} className="px-4 py-2 rounded-md border">Batal</button>
              <button onClick={saveProfile} className="px-4 py-2 rounded-md bg-emerald-600 text-white">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
