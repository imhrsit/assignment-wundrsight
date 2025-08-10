import React, { useState } from 'react';
import { login, register } from './api';

export default function AuthPage({ setAuth }) {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                const res = await login(form.email, form.password);
                if (res.token) {
                    setAuth({ token: res.token, role: res.role });
                } else {
                    setError(res.error || 'Login failed');
                }
            } else {
                const res = await register(form.name, form.email, form.password);
                if (res.user) {
                    setIsLogin(true);
                } else {
                    setError(res.error || 'Registration failed');
                }
            }
        } catch (err) {
            setError('Network error');
        }
    };

    return (
        <div className="relative">
            <div className="animate-fade-in-up bg-gradient-to-br from-purple-500 via-blue-500 to-pink-400 shadow-2xl rounded-3xl p-10 max-w-md mx-auto border-4 border-white">
                <h2 className="text-3xl font-extrabold mb-8 text-center text-white drop-shadow-lg tracking-wide">
                    {isLogin ? 'Login to Book Your Slot' : 'Create Your Account'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 text-gray-800 text-lg transition" />
                    )}
                    <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 text-gray-800 text-lg transition" />
                    <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/80 text-gray-800 text-lg transition" />
                    <button type="submit" className="w-full py-3 rounded-xl bg-pink-500 text-white font-bold text-lg shadow-lg hover:bg-pink-600 active:scale-95 transition-transform duration-150">
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>
                <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="w-full mt-6 text-white font-semibold hover:underline transition">
                    {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
                </button>
                {error && <div className="text-red-200 mt-6 text-center font-bold animate-shake">{error}</div>}
            </div>
            <style>{`
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.7s cubic-bezier(.39,.58,.57,1) both;
          }
          @keyframes shake {
            10%, 90% { transform: translateX(-2px); }
            20%, 80% { transform: translateX(4px); }
            30%, 50%, 70% { transform: translateX(-8px); }
            40%, 60% { transform: translateX(8px); }
          }
          .animate-shake {
            animation: shake 0.5s;
          }
        `}</style>
        </div>
    );
}
