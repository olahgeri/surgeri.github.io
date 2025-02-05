import React, { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>OOI - Journal Club</title>
        <meta name="description" content="Országos Onkológiai Intézet - Journal Club" />
        <link rel="stylesheet" href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css" />
      </Head>

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
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Dokumentum feltöltés</h3>
              <p>Feltöltési felület hamarosan...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
