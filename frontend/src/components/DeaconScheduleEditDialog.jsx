import React, { useState } from 'react';

export default function DeaconScheduleEditDialog({ initial, onClose, onSave }) {
  const [form, setForm] = useState({
    startDate: initial.startDate || '',
    endDate: initial.endDate || '',
    deacon: initial.deacon || '',
    akathistDate: initial.akathistDate || '',
    akathistDeacon: initial.akathistDeacon || '',
    _id: initial._id || undefined
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = e => { e.preventDefault(); onSave(form); };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: '#34495e88', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
    }}>
      <form className="panel" style={{maxWidth: 370}} onSubmit={submit}>
        <div className="panel-title">{form._id ? 'Редагувати' : 'Додати'} розклад диякона</div>
        <label>З:</label>
        <input className="input" type="date" name="startDate" value={form.startDate} onChange={handleChange} required />
        <label>По:</label>
        <input className="input" type="date" name="endDate" value={form.endDate} onChange={handleChange} required />
        <label>Служащий диякон:</label>
        <input className="input" name="deacon" value={form.deacon} onChange={handleChange} required />
        <label>Акафіст (дата):</label>
        <input className="input" type="date" name="akathistDate" value={form.akathistDate} onChange={handleChange} />
        <label>Акафіст: диякон:</label>
        <input className="input" name="akathistDeacon" value={form.akathistDeacon} onChange={handleChange} />
        <div style={{marginTop: 18}}>
          <button className="btn" type="submit">Зберегти</button>
          <button className="btn" type="button" onClick={onClose}>Скасувати</button>
        </div>
      </form>
    </div>
  );
}