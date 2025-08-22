import React, { useState } from "react";
import PriestScheduleEditDialog from "./PriestScheduleEditDialog";
import PriestScheduleTable from "./PriestScheduleTable";

export default function PriestScheduleTab({
  priests, isAdmin, schedule, onSave, onDelete, dateRange, setDateRange
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState({});

  const formatDate = date =>
    date ? (typeof date === "string" ? date.slice(0, 10) : new Date(date).toISOString().slice(0, 10)) : "";

  return (
    <div>
      <div className="priest-schedule-header">
        <span>Розклад священників</span>
        {isAdmin && (
          <button className="priest-list-btn-add" onClick={() => { setEditData({}); setOpenDialog(true); }}>
            Додати розклад
          </button>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
        <label style={{ fontWeight: 600 }}>Діапазон дат:</label>
        <input
          type="date"
          value={formatDate(dateRange[0])}
          max={formatDate(dateRange[1]) || ""}
          onChange={e => setDateRange([e.target.value ? new Date(e.target.value) : null, dateRange[1]])}
          className="church-input"
        />
        <span style={{ fontWeight: 600, fontSize: 17 }}>—</span>
        <input
          type="date"
          value={formatDate(dateRange[1])}
          min={formatDate(dateRange[0]) || ""}
          onChange={e => setDateRange([dateRange[0], e.target.value ? new Date(e.target.value) : null])}
          className="church-input"
        />
      </div>
      {isAdmin && (
        <PriestScheduleEditDialog
          open={openDialog}
          initial={editData}
          priests={priests}
          onClose={() => setOpenDialog(false)}
          onSave={onSave}
          dateRange={dateRange}
        />
      )}
      {!dateRange[0] || !dateRange[1] ? (
        <div style={{ marginTop: 12, color: "#888", fontStyle: "italic" }}>
          Оберіть діапазон дат для перегляду розкладу.
        </div>
      ) : (
        <PriestScheduleTable
          schedule={schedule}
          priests={priests}
          onDelete={onDelete}
          onEdit={entry => { setEditData(entry); setOpenDialog(true); }}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
}