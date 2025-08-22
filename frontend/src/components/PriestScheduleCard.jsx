import React from "react";

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("uk-UA");
}

export default function PriestScheduleCard({ schedule, priests, from, to, isAdmin, onEdit, onDelete }) {
  if (!schedule.length) return null;

  // Беремо перший запис для відображення
  const first = schedule[0];

  const getPriestName = id => priests.find(p => p._id === id)?.name || "";

  return (
    <div className="priest-schedule-card">
      <div className="card-header">
        <b>Розклад священників</b>
        <span style={{ fontWeight: 400, color: "#444", marginLeft: 12 }}>
          {formatDate(from)} — {formatDate(to)}
        </span>
      </div>
      <div className="card-body">
        <div>
          <span className="card-label">Служащий:</span>
          <span className="card-value">{getPriestName(first.priest)}</span>
        </div>
        <div>
          <span className="card-label">Черговий по храму:</span>
          <span className="card-value">{getPriestName(first.church_duty)}</span>
        </div>
        <div>
          <span className="card-label">Черговий по місту:</span>
          <span className="card-value">{getPriestName(first.city_duty)}</span>
        </div>
      </div>
      {isAdmin && (
        <div className="card-actions">
          <button className="btn btn-blue" onClick={() => onEdit(first)}>
            Редагувати
          </button>
          <button className="btn btn-red" onClick={onDelete}>
            Видалити
          </button>
        </div>
      )}
    </div>
  );
}