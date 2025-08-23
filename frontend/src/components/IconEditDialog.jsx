import React, { useState, useEffect } from "react";

export default function IconEditDialog({ open, initial = {}, onClose, onSave }) {
  const [name, setName] = useState(initial.name || "");
  const [number, setNumber] = useState(initial.number || "");
  const [shelf, setShelf] = useState(initial.shelf || "");
  const [note, setNote] = useState(initial.note || "");
  const [photo, setPhoto] = useState(initial.photo || "");

  useEffect(() => {
    setName(initial.name || "");
    setNumber(initial.number || "");
    setShelf(initial.shelf || "");
    setNote(initial.note || "");
    setPhoto(initial.photo || "");
  }, [initial, open]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = evt => setPhoto(evt.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !number || !shelf) {
      alert("Заповніть всі обов'язкові поля!");
      return;
    }
    if (typeof onSave === "function") {
      onSave({ ...initial, name, number, shelf, note, photo });
    }
  };

  if (!open) return null;

  return (
    <div className="church-modal-bg">
      <form className="church-modal" onSubmit={handleSubmit}>
        <div className="modal-title">
          {initial._id ? "Редагувати ікону" : "Додати ікону"}
        </div>
        <div className="church-form-row">
          <div style={{ flex: 1 }}>
            <label>Назва ікони:</label>
            <input value={name} onChange={e => setName(e.target.value)} className="church-input" required />
          </div>
          <div style={{ flex: 1 }}>
            <label>Номер ікони:</label>
            <input value={number} onChange={e => setNumber(e.target.value)} className="church-input" type="number" required />
          </div>
          <div style={{ flex: 1 }}>
            <label>Номер шафи:</label>
            <input value={shelf} onChange={e => setShelf(e.target.value)} className="church-input" type="number" required />
          </div>
        </div>
        <div className="church-form-row">
          <div style={{ flex: 2 }}>
            <label>Примітка:</label>
            <input value={note} onChange={e => setNote(e.target.value)} className="church-input" />
          </div>
          <div style={{ flex: 1 }}>
            <label>Фото:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {photo && <img src={photo} alt="Ікона" style={{ maxWidth: 80, maxHeight: 80, marginTop: 6 }} />}
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