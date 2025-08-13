import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

export default function RotationTable({ rotations }) {
  return (
    <Paper sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Початок</TableCell>
            <TableCell>Кінець</TableCell>
            <TableCell>Служащий</TableCell>
            <TableCell>Черг. по храму</TableCell>
            <TableCell>Черг. по місту</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rotations.map(r => (
            <TableRow key={r._id}>
              <TableCell>{r.startDate}</TableCell>
              <TableCell>{r.endDate}</TableCell>
              <TableCell>{r.roles.служащий}</TableCell>
              <TableCell>{r.roles.черговий_по_храму}</TableCell>
              <TableCell>{r.roles.черговий_по_місту}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}