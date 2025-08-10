
import React, { useState } from 'react';
import { login, register } from './api';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';

export default function AuthPage({ setAuth }) {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const validateEmail = email => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    const validatePassword = password => password.length >= 6;

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');

        // Input validation
        if (!validateEmail(form.email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (!validatePassword(form.password)) {
            setError('Password must be at least 6 characters.');
            return;
        }
        if (!isLogin && !form.name.trim()) {
            setError('Name is required for registration.');
            return;
        }

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
        <Fade in={true} timeout={400}>
            <Box>
                <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 2, maxWidth: 400, mx: 'auto', border: '1px solid #e0e0e0' }}>
                    <Typography variant="h5" fontWeight={700} color="primary" align="center" mb={3}>
                        {isLogin ? 'Login to Your Account' : 'Create Your Account'}
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Box display="flex" flexDirection="column" gap={2}>
                            {!isLogin && (
                                <TextField
                                    name="name"
                                    label="Name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    color="secondary"
                                />
                            )}
                            <TextField
                                name="email"
                                label="Email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                variant="outlined"
                                color="primary"
                                type="email"
                            />
                            <TextField
                                name="password"
                                label="Password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                variant="outlined"
                                color="secondary"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                sx={{ fontWeight: 600, borderRadius: 2, py: 1.5, fontSize: '1rem' }}
                            >
                                {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
                            </Button>
                        </Box>
                    </form>

                    <Typography
                        onClick={() => { setIsLogin(!isLogin); setError(''); }}
                        align="center"
                        mt={3}
                        variant="body2"
                        color="text.secondary"
                        sx={{ cursor: 'pointer', '&:hover': { color: 'secondary.main' }, transition: 'color 0.2s' }}
                    >
                        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
                    </Typography>

                    {error && (
                        <Typography align="center" color="error" fontWeight={600} mt={2}>{error}</Typography>
                    )}
                </Box>
            </Box>
        </Fade>
    );
}