import React, { useState } from 'react';

export default function LoginDialog({ open, onClose, setToken, setIsAdmin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
        const payload = JSON.parse(atob(data.token.split('.')[1]));
        setIsAdmin(payload.role === 'admin');
        onClose();
      } else {
        setError(data.message || 'Невірний логін або пароль');
      }
    } catch {
      setError('Помилка логіну');
    }
  };

  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 9999, background: '#101820aa', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <form
        style={{
          background: '#fff', borderRadius: 12, padding: 32, minWidth: 320,
          boxShadow: '0 6px 32px #10182055', position: 'relative'
        }}
        onSubmit={handleLogin}
      >
        <h2>Вхід для адміністратора</h2>
        <input
          type="text"
          placeholder="Логін"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: '100%', marginBottom: 16, padding: 10, borderRadius: 6, border: '1px solid #cfcfcf' }}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: 16, padding: 10, borderRadius: 6, border: '1px solid #cfcfcf' }}
        />
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <button
          type="submit"
          style={{
            background: '#18a058', color: '#fff', border: 'none', borderRadius: 6,
            padding: '10px 28px', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', marginRight: 12
          }}
        >Увійти</button>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: '#ccc', color: '#222', border: 'none', borderRadius: 6,
            padding: '10px 18px', fontSize: '1.1rem', fontWeight: 500, cursor: 'pointer'
          }}
        >Скасувати</button>
      </form>
    </div>
  );
}