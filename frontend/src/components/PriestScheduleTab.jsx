import React, { useState, useMemo } from "react";
import PriestScheduleEditDialog from "./PriestScheduleEditDialog";
import PriestScheduleCard from "./PriestScheduleCard";

// Групуємо розклад по унікальних комбінаціях служащих
function groupScheduleByComposition(schedule) {
  if (!schedule.length) return [];

  // Сортуємо за датою на випадок, якщо бекенд повертає не сортовано
  const sorted = [...schedule].sort((a, b) => new Date(a.date) - new Date(b.date));
  const groups = [];
  let currentGroup = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const prev = currentGroup[currentGroup.length - 1];
    const curr = sorted[i];
    // Якщо склад однаковий — додаємо до поточної групи
    if (
      prev.priest === curr.priest &&
      prev.church_duty === curr.church_duty &&
      prev.city_duty === curr.city_duty
    ) {
      currentGroup.push(curr);
    } else {
      // Якщо склад змінився — нова група
      groups.push(currentGroup);
      currentGroup = [curr];
    }
  }
  if (currentGroup.length) groups.push(currentGroup);

  return groups;
}

export default function PriestScheduleTab({
  priests, isAdmin, schedule, onSave, onDelete, dateRange, setDateRange
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState({});

  // Групи розкладів у діапазоні
  const scheduleGroups = useMemo(() => groupScheduleByComposition(schedule), [schedule]);

  const formatDate = date =>
    date ? (typeof date === "string" ? date.slice(0, 10) : new Date(date).toISOString().slice(0, 10)) : "";

  // Видалити всі записи цієї групи
  const handleDeleteGroup = (group) => {
    if (window.confirm("Видалити цей розклад на обраний період?")) {
      Promise.all(group.map(item => onDelete(item._id)));
    }
  };

  return (
    <div>
      <div className="priest-schedule-header">
        <span>Розклад священників</span>
        {isAdmin && (
          <button
            className="priest-list-btn-add"
            onClick={() => {
              setEditData({});
              setOpenDialog(true);
            }}
          >
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
      {/* Відображення розкладу */}
      {!dateRange[0] || !dateRange[1] ? (
        <div style={{ marginTop: 12, color: "#888", fontStyle: "italic" }}>
          Оберіть діапазон дат для перегляду розкладу.
        </div>
      ) : (
        <div>
          {scheduleGroups.length === 0 ? (
            <div style={{ color: "#888", fontStyle: "italic" }}>Розклад відсутній</div>
          ) : (
            scheduleGroups.map((group, idx) => (
              <PriestScheduleCard
                key={idx}
                schedule={group}
                priests={priests}
                from={group[0].date}
                to={group[group.length - 1].date}
                isAdmin={isAdmin}
                onEdit={entry => {
                  setEditData(entry);
                  setOpenDialog(true);
                }}
                onDelete={() => handleDeleteGroup(group)}
              />
            ))
          )}
        </div>
      )}
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
    </div>
  );
}