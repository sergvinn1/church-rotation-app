import React from "react";

export default function AkathistCard({ akathist, isAdmin, onEdit, onDelete }) {
  return (
    <div
      style={{
        background: "var(--panel-bg)",
        borderRadius: "18px",
        boxShadow: "var(--shadow)",
        padding: "22px 28px 16px 28px",
        minWidth: 220,
        maxWidth: 320,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        position: "relative",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: "1.18em", marginBottom: 7, color: "var(--main-blue)" }}>
        {akathist.name}
      </div>
      <div style={{ display: "flex", gap: 18, fontSize: "1em", marginBottom: 4 }}>
        <div>
          <span style={{ color: "#888" }}>Номер:</span> <b>{akathist.number}</b>
        </div>
      </div>
      {akathist.note && (
        <div style={{ color: "#4b5c6b", fontSize: "0.96em", marginTop: 4 }}>{akathist.note}</div>
      )}
      {isAdmin && (
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button className="btn btn-edit" onClick={onEdit}>Редагувати</button>
          <button className="btn btn-delete" onClick={onDelete}>Видалити</button>
        </div>
      )}
    </div>
  );
}