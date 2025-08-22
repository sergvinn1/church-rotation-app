import React from "react";

export default function PriestScheduleTable({ schedule, priests, onDelete, onEdit, isAdmin }) {
  const getPriestName = id => priests.find(p => p._id === id)?.name || id;

  if (!schedule.length)
    return <div style={{ color: "#888", fontStyle: "italic" }}>Розклад відсутній</div>;

  return (
    <table className="church-table">
      <thead>
        <tr>
          <th>Дата</th>
          <th>Служащий</th>
          <th>Черговий по храму</th>
          <th>Черговий по місту</th>
          {isAdmin && <th />}
        </tr>
      </thead>
      <tbody>
        {schedule.map(item => (
          <tr key={item._id}>
            <td>{item.date}</td>
            <td>{getPriestName(item.priest)}</td>
            <td>{getPriestName(item.church_duty)}</td>
            <td>{getPriestName(item.city_duty)}</td>
            {isAdmin && (
              <td>
                <button className="btn btn-blue" onClick={() => onEdit(item)}>Редагувати</button>
                <button className="btn btn-red" onClick={() => onDelete(item._id)}>Видалити</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}