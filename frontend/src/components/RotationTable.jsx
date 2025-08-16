import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function RotationTable({ rotations, isAdmin, onEdit, onDelete }) {
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
            {isAdmin && <TableCell>Дії</TableCell>}
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
              {isAdmin && (
                <TableCell>
                  <IconButton color="primary" onClick={() => onEdit(r)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(r._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}