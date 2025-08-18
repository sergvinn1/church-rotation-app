import React from "react";

// Очікує проп schedule = [{ date, priest, service, comment }]
export default function PriestScheduleTable({ schedule }) {
  if (!schedule.length) {
    return (
      <div style={{marginTop: 18, color: "#b44", fontWeight: 500}}>
        На обраний період розкладу не знайдено.
      </div>
    );
  }
  return (
    <div style={{overflowX: "auto"}}>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          minWidth: 420,
          fontFamily: "var(--font-main)",
          background: "var(--main-light)",
          borderRadius: "10px",
          boxShadow: "0 1px 8px #34495e17"
        }}
      >
        <thead>
          <tr style={{background: "var(--main-blue)", color: "#fff"}}>
            <th style={thStyle}>Дата</th>
            <th style={thStyle}>Священник</th>
            <th style={thStyle}>Служба</th>
            <th style={thStyle}>Коментар</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item, i) => (
            <tr key={i} style={{background: "#fff"}}>
              <td style={tdStyle}>{formatDateUA(item.date)}</td>
              <td style={tdStyle}>{item.priest}</td>
              <td style={tdStyle}>{item.service}</td>
              <td style={tdStyle}>{item.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "13px 11px",
  fontWeight: 700,
  fontSize: 17,
  borderBottom: "3px solid var(--tab-inactive)",
  textAlign: "left"
};
const tdStyle = {
  padding: "12px 10px",
  borderBottom: "1px solid var(--tab-inactive)",
  fontSize: 16
};

function formatDateUA(date) {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("uk-UA", { year: "numeric", month: "2-digit", day: "2-digit" });
}