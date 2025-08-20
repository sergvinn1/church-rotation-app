import React, { useState } from "react";
import PriestEditDialog from "./PriestEditDialog";

export default function PriestRegister({ priests, onSave, onDelete }) {
  console.log("PriestRegister priests:", priests);
  const [openDialog, setOpenDialog] = useState(false);
  const [editPriest, setEditPriest] = useState(null);

  return (
    <div>
      <button onClick={() => { setEditPriest(null); setOpenDialog(true); }}>
        + Додати священника
      </button>
      <div style={{marginTop: 16}}>
        {priests.map(priest => (
          <div key={priest._id} style={{
            background: "#fff", borderRadius: 8, marginBottom: 12, padding: 12, boxShadow: "0 1px 6px #e2e2e2",
            display: "flex", alignItems: "center", gap: 12
          }}>
            <span style={{color: "green"}}>{priest.rank}</span>
            <span style={{fontWeight: 600}}>{priest.name}</span>
            <button onClick={() => { setEditPriest(priest); setOpenDialog(true); }}>Редагувати</button>
            <button style={{color: "red"}} onClick={() => onDelete(priest._id)}>Видалити</button>
          </div>
        ))}
      </div>
      {openDialog && (
        <PriestEditDialog
          initial={editPriest || {}}
          onClose={() => setOpenDialog(false)}
          onSave={p => { onSave(editPriest ? { ...editPriest, ...p } : p); setOpenDialog(false); }}
        />
      )}
    </div>
  );
}