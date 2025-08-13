import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { login } from '../api/rotationApi';

export default function LoginForm({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      setToken(res.data.token);
      setError('');
    } catch (err) {
      setError('Невірний логін або пароль');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 6 }}>
      <Typography variant="h5">Адмін логін</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Логін"
          fullWidth
          margin="normal"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          label="Пароль"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Увійти
        </Button>
      </form>
    </Box>
  );
}