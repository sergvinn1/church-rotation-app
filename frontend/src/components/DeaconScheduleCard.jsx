import React from "react";

// Безпечний пошук диякона по id
function getDeaconInfo(id, deacons) {
  if (!Array.isArray(deacons)) return "—";
  const d = deacons.find(x => x._id === id);
  if (!d) return "—";
  return (d.rank ? d.rank + " " : "") + d.name;
}

function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("uk-UA");
}

export default function DeaconScheduleCard({
  schedule,
  isAdmin,
  onEdit,
  onDelete,
  highlightAkathist,
  showOnlyAkathist,
  deacons
}) {
  return (
    <div className="schedule-card" style={highlightAkathist ? { border: "2px solid #18a058" } : {}}>
      {showOnlyAkathist ? (
        <>
          <div className="schedule-card-date">
            АКАФІСТ: {formatDate(schedule.akathistDate)}
          </div>
          <div>
            <span className="card-label">Служащий диякон:</span>
            <span className="card-value">{getDeaconInfo(schedule.akathistDeacon, deacons)}</span>
          </div>
        </>
      ) : (
        <>
          <div className="schedule-card-date" style={{color:"#18a058"}}>
            {formatDate(schedule.startDate)} — {formatDate(schedule.endDate)}
          </div>
          <div>
            <span className="card-label">Служащий диякон:</span>
            <span className="card-value">{getDeaconInfo(schedule.deacon, deacons)}</span>
          </div>
          {schedule.akathistDate && (
            <div>
              <span className="card-label">Акафіст ({formatDate(schedule.akathistDate)}):</span>
              <span className="card-value">{getDeaconInfo(schedule.akathistDeacon, deacons)}</span>
            </div>
          )}
        </>
      )}
      {isAdmin && (
        <div className="card-actions">
          <button className="btn btn-blue" onClick={onEdit}>Редагувати</button>
          <button className="btn btn-red" onClick={onDelete}>Видалити</button>
        </div>
      )}
    </div>
  );
}