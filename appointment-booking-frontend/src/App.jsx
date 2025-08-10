import React, { useState } from 'react';
import AuthPage from './AuthPage.jsx';
import PatientDashboard from './PatientDashboard.jsx';
import AdminDashboard from './AdminDashboard.jsx';

const brandBg = "bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200";
const cardBg = "bg-white border border-blue-100 shadow-xl rounded-2xl";

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

  if (!auth) return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${brandBg}`}>
      <div className={`w-full max-w-md mx-auto p-6 ${cardBg}`}>
        <AuthPage setAuth={handleAuth} />
      </div>
    </div>
  );
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${brandBg}`}>
      <div className="w-full flex justify-end py-8 px-4">
        <button onClick={handleLogout} className="px-4 py-2 bg-blue-700 text-white rounded shadow hover:bg-blue-800 transition">Logout</button>
      </div>
      <main className={`w-full max-w-2xl mx-auto p-6 ${cardBg}`}>
        {auth.role === 'admin' ? <AdminDashboard auth={auth} /> : <PatientDashboard auth={auth} />}
      </main>
    </div>
  );
}

export default App;
