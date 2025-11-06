import React, { useState } from 'react';

export default function AuthGate({ onAuthenticated }) {
  const [mode, setMode] = useState('login'); // login | signup
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer'); // admin | buyer
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Mohon isi username dan password');
      return;
    }
    // Simulate success auth (no backend for now)
    onAuthenticated({ username: username.trim(), role: mode === 'signup' ? (role === 'admin' ? 'admin' : 'buyer') : 'buyer' });
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">{mode === 'login' ? 'Masuk' : 'Daftar'} ke Nasi Goreng Rasy</h1>
          <button
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-emerald-600 hover:underline text-sm"
          >
            {mode === 'login' ? 'Buat akun' : 'Sudah punya akun? Masuk'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="contoh: rasyid"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="********"
            />
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-sm text-gray-600 mb-1">Masuk sebagai</label>
              <div className="flex gap-3">
                <label className="flex items-center gap-2">
                  <input type="radio" name="role" value="buyer" checked={role === 'buyer'} onChange={() => setRole('buyer')} />
                  <span>Pembeli</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="role" value="admin" checked={role === 'admin'} onChange={() => setRole('admin')} />
                  <span>Admin</span>
                </label>
              </div>
            </div>
          )}

          {error && <div className="text-sm text-red-600">{error}</div>}

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
          >
            {mode === 'login' ? 'Masuk' : 'Daftar'}
          </button>
        </form>
      </div>
    </div>
  );
}
