const API_URL = 'https://assignment-wundrsight.onrender.com';

export async function register(name, email, password) {
    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });
    return res.json();
}

export async function login(email, password) {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return res.json();
}

export async function getSlots(token, from, to) {
    const res = await fetch(`${API_URL}/slots?from=${from}&to=${to}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
}

export async function bookSlot(token, slotId) {
    const res = await fetch(`${API_URL}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ slotId })
    });
    return res.json();
}

export async function getMyBookings(token) {
    const res = await fetch(`${API_URL}/my-bookings`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
}

export async function getAllBookings(token) {
    const res = await fetch(`${API_URL}/all-bookings`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
}
