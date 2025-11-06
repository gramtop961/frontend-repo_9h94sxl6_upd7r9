import { User, ImagePlus } from 'lucide-react';

export default function TopBar({ user, activeTab, setActiveTab, onOpenProfile, onAdminAddImages }) {
  return (
    <div className="sticky top-0 z-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold">NR</div>
          <div>
            <h1 className="text-lg font-semibold text-slate-800">Nasi Goreng Rasy</h1>
            <p className="text-xs text-slate-500">Jl. Kamarung RT 04 RW 05</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <nav className="hidden sm:flex items-center gap-1 mr-2">
            <button onClick={() => setActiveTab(user?.role === 'admin' ? 'adminOrders' : 'order')} className={`px-3 py-2 rounded-md text-sm ${activeTab === 'order' || activeTab === 'adminOrders' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}>{user?.role === 'admin' ? 'Lihat Pesanan' : 'Pesan'}</button>
            <button onClick={() => setActiveTab('menu')} className={`px-3 py-2 rounded-md text-sm ${activeTab === 'menu' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}>List Menu</button>
            <button onClick={() => setActiveTab('history')} className={`px-3 py-2 rounded-md text-sm ${activeTab === 'history' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}>History</button>
          </nav>

          {user?.role === 'admin' && (
            <button onClick={onAdminAddImages} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100">
              <ImagePlus size={18} />
              <span className="text-sm">Tambah Gambar Menu</span>
            </button>
          )}

          <button onClick={onOpenProfile} className="ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">
            <User size={18} />
            <span className="text-sm">Profil</span>
          </button>
        </div>
      </div>
    </div>
  );
}
