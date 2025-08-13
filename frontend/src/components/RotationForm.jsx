import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { addRotation } from '../api/rotationApi';

export default function RotationForm({ token, onAdded }) {
  const [form, setForm] = useState({
    startDate: '',
    endDate: '',
    roles: {
      служащий: '',
      черговий_по_храму: '',
      черговий_по_місту: ''
    }
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    if (['служащий', 'черговий_по_храму', 'черговий_по_місту'].includes(name)) {
      setForm({ ...form, roles: { ...form.roles, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addRotation(form, token);
      setError('');
      setForm({
        startDate: '',
        endDate: '',
        roles: {
          служащий: '',
          черговий_по_храму: '',
          черговий_по_місту: ''
        }
      });
      if (onAdded) onAdded();
    } catch {
      setError('Помилка додавання');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h6">Додати чергування</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Початок"
          name="startDate"
          type="date"
          fullWidth
          margin="normal"
          value={form.startDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Кінець"
          name="endDate"
          type="date"
          fullWidth
          margin="normal"
          value={form.endDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Служащий"
          name="служащий"
          fullWidth
          margin="normal"
          value={form.roles.служащий}
          onChange={handleChange}
        />
        <TextField
          label="Черг. по храму"
          name="черговий_по_храму"
          fullWidth
          margin="normal"
          value={form.roles.черговий_по_храму}
          onChange={handleChange}
        />
        <TextField
          label="Черг. по місту"
          name="черговий_по_місту"
          fullWidth
          margin="normal"
          value={form.roles.черговий_по_місту}
          onChange={handleChange}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Додати
        </Button>
      </form>
    </Box>
  );
}