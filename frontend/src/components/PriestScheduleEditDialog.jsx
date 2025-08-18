import React, { useState, useEffect } from "react";

const PriestScheduleEditDialog = ({ open, initial, priests, onClose, onSave }) => {
  const [form, setForm] = useState({
    date: initial?.date || "",
    priest: initial?.priest || "",
    church_duty: initial?.church_duty || "",
    city_duty: initial?.city_duty || "",
    _id: initial?._id || undefined,
  });

  // Оновлюємо форму при зміні initial (наприклад, при редагуванні)
  useEffect(() => {
    setForm({
      date: initial?.date || "",
      priest: initial?.priest || "",
      church_duty: initial?.church_duty || "",
      city_duty: initial?.city_duty || "",
      _id: initial?._id || undefined,
    });
  }, [initial]);

  if (!open) return null; // Головна умова!

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "#34495e88", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
    }} onClick={onClose}>
      <form className="panel" style={{ maxWidth: 340 }} onSubmit={submit} onClick={e => e.stopPropagation()}>
        <div className="panel-title">{form._id ? "Редагувати" : "Додати"} розклад священника</div>
        <label>Дата:</label>
        <input className="input" type="date" name="date" value={form.date} onChange={handleChange} required />
        <label>Служащий:</label>
        <select className="input" name="priest" value={form.priest} onChange={handleChange} required>
          <option value="">Оберіть священника</option>
          {priests.map(p => <option key={p._id} value={p.name}>{p.name}</option>)}
        </select>
        <label>Черговий по храму:</label>
        <input className="input" name="church_duty" value={form.church_duty} onChange={handleChange} required />
        <label>Черговий по місту:</label>
        <input className="input" name="city_duty" value={form.city_duty} onChange={handleChange} required />
        <div style={{ marginTop: 18 }}>
          <button className="btn" type="submit">Зберегти</button>
          <button className="btn" type="button" onClick={onClose}>Скасувати</button>
        </div>
      </form>
    </div>
  );
};

export default PriestScheduleEditDialog;