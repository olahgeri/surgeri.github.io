import React, { useState } from 'react';
import { Upload } from 'lucide-react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (data.authorized) {
        setIsAuthorized(true);
      } else {
        setError('Nincs jogosultság a hozzáféréshez');
      }
    } catch (err) {
      setError('Hiba történt a bejelentkezés során');
    } finally {
      setLoading(false);
    }
  };

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    // URL feltöltés implementálása
    console.log('URL feltöltve:', url);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf' || 
          file.type === 'application/msword' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFile(file);
        // Fájl feltöltés implementálása
        console.log('Fájl kiválasztva:', file.name);
      } else {
        setError('Csak PDF és Word dokumentumok tölthetők fel');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Országos Onkológiai Intézet</h1>
          <h2 className="text-xl mt-2">Hasi Sebészeti Osztály - Journal Club</h2>
        </div>

        {!isAuthorized ? (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4">Bejelentkezés</h3>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Add meg az email címed"
                className="w-full p-2 border rounded mb-4"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Ellenőrzés...' : 'Belépés'}
              </button>
              {error && (
                <p className="mt-3 text-red-600 text-sm">{error}</p>
              )}
            </form>
          </div>
        ) : (
          <div className="grid gap-6">
            {/* URL feltöltés */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Tudományos cikk hivatkozás feltöltése</h3>
              <form onSubmit={handleUrlSubmit}>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Illessze be a cikk URL címét"
                  className="w-full p-2 border rounded mb-4"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  URL feltöltése
                </button>
              </form>
            </div>

            {/* Dokumentum feltöltés */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Dokumentum feltöltése</h3>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <p className="mb-2">Kattintson vagy húzza ide a fájlt</p>
                  <p className="text-sm text-gray-500">PDF vagy Word dokumentum</p>
                </label>
                {file && (
                  <p className="mt-4 text-green-600">Kiválasztott fájl: {file.name}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
