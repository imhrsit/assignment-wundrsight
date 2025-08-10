import React, { useState } from 'react';
import AuthPage from './AuthPage.jsx';
import PatientDashboard from './PatientDashboard.jsx';
import AdminDashboard from './AdminDashboard.jsx';

const brandBg = "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50";
const cardBg = "bg-white border border-gray-100 shadow-xl rounded-2xl backdrop-blur";

function App() {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    return token ? { token, role } : null;
  });

  const handleAuth = ({ token, role }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setAuth({ token, role });
  };

  const handleLogout = () => {
    localStorage.clear();
    setAuth(null);
  };

  // Not logged in
  if (!auth) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${brandBg}`}>
        <div className={`w-full max-w-md p-8 ${cardBg}`}>
          <AuthPage setAuth={handleAuth} />
        </div>
      </div>
    );
  }

  // Logged in
  return (
    <div className={`min-h-screen flex flex-col ${brandBg}`}>
      <header className="flex justify-end px-6 py-4">
        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-medium shadow hover:shadow-lg hover:scale-105 transition-transform"
        >
          Logout
        </button>
      </header>
      <main className={`flex-1 w-full max-w-4xl mx-auto p-6 ${cardBg}`}>
        {auth.role === 'admin'
          ? <AdminDashboard auth={auth} />
          : <PatientDashboard auth={auth} />}
      </main>
    </div>
  );
}

export default App;