import React, { useState, useEffect } from 'react';
import { getPriestSchedules, addPriestSchedule, updatePriestSchedule, deletePriestSchedule, getPriests } from '../api/rotationApi';
import PriestScheduleEditDialog from './PriestScheduleEditDialog';

export default function PriestScheduleTab({ isAdmin, token }) {
  const [schedules, setSchedules] = useState([]);
  const [priests, setPriests] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    const res = await getPriestSchedules(from, to);
    setSchedules(res.data);
    setLoading(false);
  };

  const fetchPriests = async () => {
    const res = await getPriests();
    setPriests(res.data);
  };

  useEffect(() => { fetchData(); }, [from, to]);
  useEffect(() => { fetchPriests(); }, []);

  const handleAdd = async (data) => {
    await addPriestSchedule(data, token);
    fetchData();
  };

  const handleEdit = async (data) => {
    await updatePriestSchedule(data._id, data, token);
    setEdit(null);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Видалити розклад?')) {
      await deletePriestSchedule(id, token);
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
            <div className="card-title">{item.date}</div>
            <div className="card-meta">
              Служащий: <b>{item.priest}</b><br/>
              Черговий по храму: <b>{item.church_duty}</b><br/>
              Черговий по місту: <b>{item.city_duty}</b>
            </div>
            {isAdmin && (
              <div className="card-actions">
                <button className="btn" onClick={() => setEdit(item)}>Редагувати</button>
                <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Видалити</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {edit && (
        <PriestScheduleEditDialog
          initial={edit}
          priests={priests}
          onClose={() => setEdit(null)}
          onSave={edit._id ? handleEdit : handleAdd}
        />
      )}
    </div>
  );
}