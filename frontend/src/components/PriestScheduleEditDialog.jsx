import React, { useState, useEffect } from "react";

// Допоміжна функція для діапазону дат
function getDatesInRange(start, end) {
  const dates = [];
  let d = new Date(start);
  end = new Date(end);
  while (d <= end) {
    dates.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

const PriestScheduleEditDialog = ({
  open,
  initial = {},
  priests = [],
  onClose,
  onSave,
  dateRange = []
}) => {
  console.log("PriestScheduleEditDialog priests:", priests);
  const [form, setForm] = useState({
    fromDate: "",
    toDate: "",
    priest: "",
    church_duty: "",
    city_duty: "",
    _id: undefined,
  });

  useEffect(() => {
    setForm({
      fromDate: initial?.fromDate || "",
      toDate: initial?.toDate || "",
      priest: initial?.priest || "",
      church_duty: initial?.church_duty || "",
      city_duty: initial?.city_duty || "",
      _id: initial?._id,
    });
  }, [initial, open]);

  if (!open) return null;

  const minDate = dateRange?.[0] ? new Date(dateRange[0]).toISOString().slice(0,10) : "";
  const maxDate = dateRange?.[1] ? new Date(dateRange[1]).toISOString().slice(0,10) : "";

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = e => {
    e.preventDefault();
    if (form.fromDate > form.toDate) {
      alert("Дата \"з\" не може бути пізніше за \"по\"!");
      return;
    }
    const dates = getDatesInRange(form.fromDate, form.toDate);
    const records = dates.map(date => ({
      date: date.toISOString().slice(0, 10),
      priest: form.priest,
      church_duty: form.church_duty,
      city_duty: form.city_duty,
      _id: form._id ? `${form._id}_${date.toISOString().slice(0, 10)}` : undefined,
    }));
    onSave(records);
  };

  return (
    <div className="modal-bg" onClick={onClose}>
      <form className="modal-panel" onClick={e => e.stopPropagation()} onSubmit={submit}>
        <div className="modal-title">Додати розклад священника</div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}>
            <label>З дати:</label>
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
          </div>
          <div style={{ flex: 1 }}>
            <label>По дату:</label>
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
          </div>
        </div>
        <label>Служащий:</label>
        <select className="church-input" name="priest" value={form.priest} onChange={handleChange} required>
          <option value="">Оберіть священника</option>
          {(Array.isArray(priests) ? priests : []).map(p => (
            <option key={p._id} value={p._id}>{p.rank} {p.name}</option>
          ))}
        </select>
        <label>Черговий по храму:</label>
        <select className="church-input" name="church_duty" value={form.church_duty} onChange={handleChange} required>
          <option value="">Оберіть священника</option>
          {(Array.isArray(priests) ? priests : []).map(p => (
            <option key={p._id} value={p._id}>{p.rank} {p.name}</option>
          ))}
        </select>
        <label>Черговий по місту:</label>
        <select className="church-input" name="city_duty" value={form.city_duty} onChange={handleChange} required>
          <option value="">Оберіть священника</option>
          {(Array.isArray(priests) ? priests : []).map(p => (
            <option key={p._id} value={p._id}>{p.rank} {p.name}</option>
          ))}
        </select>
        <div className="modal-btn-row">
          <button className="btn btn-green" type="submit">Зберегти</button>
          <button className="btn btn-gray" type="button" onClick={onClose}>Скасувати</button>
        </div>
      </form>
    </div>
  );
};

export default PriestScheduleEditDialog;