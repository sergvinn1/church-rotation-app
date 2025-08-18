import React, { useState, useEffect, useMemo } from "react";
import PriestScheduleEditDialog from "./PriestScheduleEditDialog";
import PriestScheduleTable from "./PriestScheduleTable";

export default function PriestScheduleTab({ isAdmin, token }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState({});
  const [priests, setPriests] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [schedule, setSchedule] = useState([]);

  // Приклад завантаження священиків
  useEffect(() => {
    // тут має бути реальний fetch
    setPriests([
      { _id: "1", name: "о. Іван" },
      { _id: "2", name: "о. Петро" },
    ]);
  }, []);

  // Приклад handleSave
  const handleSave = (record) => {
    // Додає новий запис або змінює існуючий
    setSchedule(prev => {
      if (record._id) {
        return prev.map(r => r._id === record._id ? record : r);
      }
      return [...prev, { ...record, _id: Date.now().toString() }];
    });
    setOpenDialog(false);
  };

  const filteredSchedule = useMemo(() => {
    if (!dateRange[0] || !dateRange[1]) return [];
    const start = new Date(dateRange[0]).setHours(0, 0, 0, 0);
    const end = new Date(dateRange[1]).setHours(23, 59, 59, 999);
    return schedule.filter(item => {
      const date = new Date(item.date).getTime();
      return date >= start && date <= end;
    });
  }, [schedule, dateRange]);

  const formatDate = date =>
    date
      ? new Date(date).toISOString().slice(0, 10)
      : "";

  return (
    <div>
      <div className="priest-schedule-header">
        <span>Розклад священників</span>
        {isAdmin && (
          <button
            className="priest-list-btn-add"
            onClick={() => { setEditData({}); setOpenDialog(true); }}
            style={{marginBottom: 0}}
          >
            Додати/редагувати розклад
          </button>
        )}
      </div>
      <div style={{display: "flex", alignItems: "center", gap: 16, marginBottom: 20}}>
        <label style={{fontWeight: 600}}>Діапазон дат:</label>
        <input
          type="date"
          value={formatDate(dateRange[0])}
          max={formatDate(dateRange[1]) || ""}
          onChange={e => setDateRange([e.target.value ? new Date(e.target.value) : null, dateRange[1]])}
          className="church-input"
        />
        <span style={{fontWeight: 600, fontSize: 17}}>—</span>
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
          onSave={handleSave}
        />
      )}
      {!dateRange[0] || !dateRange[1] ? (
        <div style={{marginTop: 12, color: "#888", fontStyle: "italic"}}>
          Оберіть діапазон дат для перегляду розкладу.
        </div>
      ) : (
        <PriestScheduleTable schedule={filteredSchedule} />
      )}
    </div>
  );
}