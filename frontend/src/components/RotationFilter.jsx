import React from 'react';
import { Box, TextField, Button } from '@mui/material';

export default function RotationFilter({ from, to, setFrom, setTo, onFilter }) {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
      <TextField
        label="Від"
        type="date"
        value={from}
        onChange={e => setFrom(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="До"
        type="date"
        value={to}
        onChange={e => setTo(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" onClick={onFilter}>Фільтрувати</Button>
    </Box>
  );
}