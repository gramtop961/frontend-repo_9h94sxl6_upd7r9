import { useState } from 'react';

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AuthGate({ onAuth }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('pembeli'); // 'admin' | 'pembeli'
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const dataUrl = await fileToDataUrl(file);
    setPhotoPreview(dataUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let photo = photoPreview;
    if (mode === 'signup' && photoFile && !photo) {
      photo = await fileToDataUrl(photoFile);
    }
    if (!username.trim()) return;
    onAuth({ username: username.trim(), role: mode === 'signup' ? role : 'pembeli', photo });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-emerald-700 text-center">Nasi Goreng Rasy</h1>
        <p className="text-center text-slate-500 mt-1">Silakan {mode === 'login' ? 'masuk' : 'daftar'} untuk melanjutkan</p>

        <div className="mt-4 flex gap-2 bg-slate-100 p-1 rounded-lg">
          <button onClick={() => setMode('login')} className={`flex-1 py-2 rounded-md text-sm font-medium ${mode === 'login' ? 'bg-white shadow text-emerald-700' : 'text-slate-600'}`}>Login</button>
          <button onClick={() => setMode('signup')} className={`flex-1 py-2 rounded-md text-sm font-medium ${mode === 'signup' ? 'bg-white shadow text-emerald-700' : 'text-slate-600'}`}>Sign Up</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="nama pengguna" />
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-slate-700">Peran</label>
              <div className="mt-1 grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setRole('pembeli')} className={`py-2 rounded-md border ${role === 'pembeli' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-600'}`}>Pembeli</button>
                <button type="button" onClick={() => setRole('admin')} className={`py-2 rounded-md border ${role === 'admin' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-600'}`}>Admin</button>
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-slate-700">Foto Profil (upload file)</label>
              <div className="mt-1 flex items-center gap-3">
                <label className="w-20 h-20 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center cursor-pointer border border-slate-200">
                  {photoPreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photoPreview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-slate-500">Pilih Foto</span>
                  )}
                  <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                </label>
                <span className="text-xs text-slate-500">Gambar disimpan lokal (data URL)</span>
              </div>
            </div>
          )}

          <button type="submit" className="w-full py-2.5 rounded-md bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition">{mode === 'login' ? 'Masuk' : 'Daftar'}</button>
        </form>
      </div>
    </div>
  );
}
