import React, { useState } from "react";
import PriestEditDialog from "./PriestEditDialog";

export default function PriestListTab({ priests, onSave, onDelete, isAdmin }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [editPriest, setEditPriest] = useState(null);

  return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <h3>Священники (реєстр)</h3>
      {isAdmin && (
        <button
          className="btn btn-green"
          style={{ marginBottom: 16 }}
          onClick={() => { setEditPriest(null); setOpenDialog(true); }}
        >
          + Додати священника
        </button>
      )}
      <div>
        {priests.length === 0 && (
          <div style={{ color: "#888", fontStyle: "italic" }}>Священників поки що немає</div>
        )}
        {priests.map(priest => (
          <div key={priest._id} style={{
            background: "#fff", borderRadius: 8, marginBottom: 12, padding: 12, boxShadow: "0 1px 6px #e2e2e2",
            display: "flex", alignItems: "center", gap: 12
          }}>
            <span style={{ color: "green" }}>{priest.rank}</span>
            <span style={{ fontWeight: 600 }}>{priest.name}</span>
            {isAdmin && (
              <>
                <button className="btn btn-blue" onClick={() => { setEditPriest(priest); setOpenDialog(true); }}>Редагувати</button>
                <button className="btn btn-red" onClick={() => onDelete(priest._id)}>Видалити</button>
              </>
            )}
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