import React, { useState } from "react";

const PriestEditDialog = ({ initial, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: initial.name || "",
    rank: initial.rank || "",
    _id: initial._id || undefined,
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "#34495e88", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
    }}>
      <form className="panel" style={{ maxWidth: 340 }} onSubmit={submit}>
        <div className="panel-title">{form._id ? "Редагувати" : "Додати"} священника</div>
        <label>Ім'я:</label>
        <input className="input" name="name" value={form.name} onChange={handleChange} required />
        <label>Сан / ранг:</label>
        <input className="input" name="rank" value={form.rank} onChange={handleChange} required />
        <div style={{ marginTop: 18 }}>
          <button className="btn" type="submit">Зберегти</button>
          <button className="btn" type="button" onClick={onClose}>Скасувати</button>
        </div>
      </form>
    </div>
  );
};

export default PriestEditDialog;