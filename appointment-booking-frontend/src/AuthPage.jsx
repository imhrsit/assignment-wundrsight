import React, { useState } from 'react';
import { login, register } from './api';

export default function AuthPage({ setAuth }) {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setLoading(true);
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
        } catch {
            setError('Network error');
        }
        setLoading(false);
    };

    return (
        <div className="animate-fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    {isLogin ? 'Login to Your Account' : 'Create Your Account'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <input
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 bg-white text-gray-800"
                        />
                    )}
                    <input
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 bg-white text-gray-800"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 bg-white text-gray-800"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow hover:shadow-lg hover:scale-[1.02] transition-transform disabled:opacity-50"
                    >
                        {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
                    </button>
                </form>

                <p
                    onClick={() => { setIsLogin(!isLogin); setError(''); }}
                    className="mt-4 text-center text-sm text-gray-600 cursor-pointer hover:text-pink-500 transition"
                >
                    {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
                </p>

                {error && <div className="mt-4 text-center text-red-500 font-medium">{error}</div>}
            </div>

            <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out; }
    `}</style>
        </div>
    );
}