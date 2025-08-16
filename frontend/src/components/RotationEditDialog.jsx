import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

export default function RotationEditDialog({ open, rotation, onClose, onSave }) {
  const [form, setForm] = useState({
    startDate: '',
    endDate: '',
    roles: {
      служащий: '',
      черговий_по_храму: '',
      черговий_по_місту: ''
    }
  });

  useEffect(() => {
    if (rotation) setForm(rotation);
  }, [rotation]);

  const handleChange = e => {
    const { name, value } = e.target;
    if (['служащий', 'черговий_по_храму', 'черговий_по_місту'].includes(name)) {
      setForm({ ...form, roles: { ...form.roles, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSave = () => onSave(form);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Редагувати чергування</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Скасувати</Button>
        <Button variant="contained" onClick={handleSave}>Зберегти</Button>
      </DialogActions>
    </Dialog>
  );
}