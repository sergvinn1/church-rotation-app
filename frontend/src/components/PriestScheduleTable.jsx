import React from "react";

// schedule = масив { date, priest, church_duty, city_duty, _id }
// priests = масив { _id, name, rank }
function priestNameById(id, priests) {
  const p = priests.find(pr => pr._id === id);
  return p ? `${p.rank} ${p.name}` : "—";
}

const PriestScheduleTable = ({ schedule, priests }) => {
  if (!schedule.length) {
    return <div style={{ color: "#888", fontStyle: "italic", marginTop: 16 }}>Немає даних для вибраного діапазону.</div>;
  }
  return (
    <div className="schedule-cards-container">
      {schedule.map((item, idx) => (
        <div className="schedule-card" key={item._id || idx}>
          <div className="schedule-card-date">{new Date(item.date).toLocaleDateString()}</div>
          <div><b>Служащий:</b> {priestNameById(item.priest, priests)}</div>
          <div><b>Черговий по храму:</b> {priestNameById(item.church_duty, priests)}</div>
          <div><b>Черговий по місту:</b> {priestNameById(item.city_duty, priests)}</div>
        </div>
      ))}
    </div>
  );
};

export default PriestScheduleTable;