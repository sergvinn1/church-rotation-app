import React, { useState, useEffect } from "react";

export default function AkathistEditDialog({ open, initial = {}, onClose, onSave }) {
  const [name, setName] = useState(initial.name || "");
  const [number, setNumber] = useState(initial.number || "");
  const [note, setNote] = useState(initial.note || "");

  useEffect(() => {
    setName(initial.name || "");
    setNumber(initial.number || "");
    setNote(initial.note || "");
  }, [initial, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !number) {
      alert("Заповніть всі обов'язкові поля!");
      return;
    }
    if (typeof onSave === "function") {
      onSave({ ...initial, name, number, note });
    }
  };

  if (!open) return null;

  return (
    <div className="church-modal-bg">
      <form className="church-modal" onSubmit={handleSubmit}>
        <div className="modal-title">
          {initial._id ? "Редагувати акафіст" : "Додати акафіст"}
        </div>
        <div className="church-form-row">
          <div style={{ flex: 2 }}>
            <label>Назва акафісту:</label>
            <input value={name} onChange={e => setName(e.target.value)} className="church-input" required />
          </div>
          <div style={{ flex: 1 }}>
            <label>Номер акафісту:</label>
            <input value={number} onChange={e => setNumber(e.target.value)} className="church-input" type="number" required />
          </div>
        </div>
        <div className="church-form-row">
          <div style={{ flex: 2 }}>
            <label>Примітка:</label>
            <input value={note} onChange={e => setNote(e.target.value)} className="church-input" />
          </div>
        </div>
        <div className="church-btn-row">
          <button type="submit" className="btn btn-green">Зберегти</button>
          <button type="button" className="btn btn-gray" onClick={onClose}>Скасувати</button>
        </div>
      </form>
    </div>
  );
}