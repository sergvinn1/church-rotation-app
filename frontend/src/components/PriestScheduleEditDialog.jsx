import React, { useState } from "react";

export default function PriestScheduleEditDialog({
  open, onClose, onSave, priests, initial = {}, dateRange
}) {
  const [form, setForm] = useState({
    fromDate: initial.fromDate || "",
    toDate: initial.toDate || "",
    priest: initial.priest || "",
    church_duty: initial.church_duty || "",
    city_duty: initial.city_duty || "",
    _id: initial._id
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Якщо редагування — onSave(form)
    // Якщо додавання — onSave для кожної дати в діапазоні
    if(form.fromDate && form.toDate) {
      const result = [];
      let current = new Date(form.fromDate);
      const end = new Date(form.toDate);
      // Додаємо всі дати в діапазоні включно
      while (current <= end) {
        result.push({
          date: current.toISOString().slice(0,10),
          priest: form.priest,
          church_duty: form.church_duty,
          city_duty: form.city_duty,
          _id: form._id
        });
        current.setDate(current.getDate() + 1);
      }
      onSave(result);
    } else {
      onSave([form]);
    }
    onClose();
  }

  if (!open) return null;

  const minDate = dateRange && dateRange[0]
    ? (typeof dateRange[0] === "string" ? dateRange[0] : dateRange[0].toISOString().slice(0, 10))
    : "";
  const maxDate = dateRange && dateRange[1]
    ? (typeof dateRange[1] === "string" ? dateRange[1] : dateRange[1].toISOString().slice(0, 10))
    : "";

  return (
    <div className="modal-bg" onClick={onClose}>
      <form className="modal-panel" onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className="modal-title">{form._id ? "Редагувати" : "Додати"} розклад</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <label>З дати:
            <input
              className="church-input"
              type="date"
              name="fromDate"
              value={form.fromDate}
              min={minDate}
              max={form.toDate || maxDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>По дату:
            <input
              className="church-input"
              type="date"
              name="toDate"
              value={form.toDate}
              min={form.fromDate || minDate}
              max={maxDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>Служащий:
            <select
              className="church-input"
              name="priest"
              value={form.priest}
              onChange={handleChange}
              required
            >
              <option value="">Оберіть священника</option>
              {priests.map(p => (
                <option key={p._id} value={p._id}>{p.rank} {p.name}</option>
              ))}
            </select>
          </label>
          <label>Черговий по храму:
            <select
              className="church-input"
              name="church_duty"
              value={form.church_duty}
              onChange={handleChange}
              required
            >
              <option value="">Оберіть священника</option>
              {priests.map(p => (
                <option key={p._id} value={p._id}>{p.rank} {p.name}</option>
              ))}
            </select>
          </label>
          <label>Черговий по місту:
            <select
              className="church-input"
              name="city_duty"
              value={form.city_duty}
              onChange={handleChange}
              required
            >
              <option value="">Оберіть священника</option>
              {priests.map(p => (
                <option key={p._id} value={p._id}>{p.rank} {p.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20, gap: 10 }}>
          <button type="submit" className="btn btn-green">Зберегти</button>
          <button type="button" className="btn btn-red" onClick={onClose}>Скасувати</button>
        </div>
      </form>
    </div>
  );
}