import React, { useState } from 'react';

function ProfileEditor({ user, onSave, onLogout }) {
  const [username, setUsername] = useState(user?.username || '');
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || '');

  return (
    <div className="absolute right-0 mt-2 w-80 rounded-xl border bg-white shadow-xl p-4 z-50">
      <h3 className="text-lg font-semibold mb-2">Profil</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Tulis username"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">URL Foto Profil</label>
          <input
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="https://... (opsional)"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSave({ username: username.trim(), photoUrl: photoUrl.trim() })}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
          >
            Simpan
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TopBar({ currentTab, setCurrentTab, user, onUpdateProfile, onLogout }) {
  const [open, setOpen] = useState(false);

  const tabs = [
    user?.role === 'admin' ? 'Lihat Pesanan' : 'Pesan',
    'List Menu',
    'History',
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-600 text-white grid place-items-center font-bold">NR</div>
          <div>
            <div className="font-semibold text-lg">Nasi Goreng Rasy</div>
            <div className="text-xs text-gray-500">Jl. Kamarung RT 04 RW 05</div>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setCurrentTab(t)}
              className={`px-4 py-2 rounded-full text-sm transition border ${
                currentTab === t ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t}
            </button>
          ))}
        </nav>

        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-10 h-10 rounded-full border overflow-hidden bg-gray-50 flex items-center justify-center"
            title={user?.username || 'Profil'}
          >
            {user?.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.photoUrl} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm text-gray-500">
                {user?.username ? user.username[0]?.toUpperCase() : 'P'}
              </span>
            )}
          </button>
          {open && (
            <div onMouseLeave={() => setOpen(false)}>
              <ProfileEditor
                user={user}
                onSave={(u) => {
                  onUpdateProfile(u);
                  setOpen(false);
                }}
                onLogout={() => {
                  onLogout();
                  setOpen(false);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
