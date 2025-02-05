import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Országos Onkológiai Intézet</h1>
          <h2 className="text-xl mt-2">Hasi Sebészeti Osztály - Journal Club</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
          <h3 className="text-lg font-semibold mb-4">Bejelentkezés</h3>
          <form>
            <input
              type="email"
              placeholder="Add meg az email címed"
              className="w-full p-2 border rounded mb-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Belépés
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
