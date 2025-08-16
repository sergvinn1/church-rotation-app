import React, { useState, useEffect } from "react";
import {
  getDeaconSchedules,
  addDeaconSchedule,
  updateDeaconSchedule,
  deleteDeaconSchedule,
} from "../api/rotationApi";
import DeaconScheduleEditDialog from "./DeaconScheduleEditDialog";

const DeaconScheduleTab = ({ token, isAdmin }) => {
  const [schedules, setSchedules] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    const res = await getDeaconSchedules(from, to);
    setSchedules(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [from, to]);

  const handleAdd = async (data) => {
    await addDeaconSchedule(data, token);
    fetchData();
  };

  const handleEdit = async (data) => {
    await updateDeaconSchedule(data._id, data, token);
    setEdit(null);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Видалити розклад?")) {
      await deleteDeaconSchedule(id, token);
      fetchData();
    }
  };

  return (
    <div>
      <div className="filter-row">
        <span className="filter-label">З:</span>
        <input className="input" type="date" value={from} onChange={e => setFrom(e.target.value)} />
        <span className="filter-label">По:</span>
        <input className="input" type="date" value={to} onChange={e => setTo(e.target.value)} />
        <button className="btn" onClick={fetchData}>Показати</button>
        {isAdmin && (
          <button className="btn" onClick={() => setEdit({})}>+ Додати розклад</button>
        )}
      </div>
      {loading && <div>Завантаження...</div>}
      <div>
        {schedules.map(item => (
          <div className="card" key={item._id}>
            <div className="card-title">{item.startDate} — {item.endDate}</div>
            <div className="card-meta">Служащий диякон: <b>{item.deacon}</b></div>
            {item.akathistDate &&
              <div>Акафіст ({item.akathistDate}): <b>{item.akathistDeacon}</b></div>
            }
            {isAdmin && (
              <div className="card-actions">
                <button className="btn" onClick={() => setEdit(item)}>
                  Редагувати
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>
                  Видалити
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {edit && (
        <DeaconScheduleEditDialog
          initial={edit}
          onClose={() => setEdit(null)}
          onSave={edit._id ? handleEdit : handleAdd}
        />
      )}
    </div>
  );
};

export default DeaconScheduleTab;