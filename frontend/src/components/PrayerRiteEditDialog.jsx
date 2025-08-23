import React, { useState, useEffect } from "react";

export default function PrayerRiteEditDialog({ open, initial = {}, onClose, onSave }) {
  const [name, setName] = useState(initial.name || "");
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    setName(initial.name || "");
    setPdfFile(null);
  }, [initial, open]);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Вкажіть назву чину!");
      return;
    }
    if (typeof onSave === "function") {
      onSave({ ...initial, name }, pdfFile);
    }
  };

  if (!open) return null;
  return (
    <div className="church-modal-bg">
      <form className="church-modal" onSubmit={handleSubmit}>
        <div className="modal-title">
          {initial._id ? "Редагувати чин" : "Додати чин"}
        </div>
        <div className="church-form-row">
          <div style={{ flex: 2 }}>
            <label>Назва чину:</label>
            <input value={name} onChange={e => setName(e.target.value)} className="church-input" required />
          </div>
          <div style={{ flex: 1 }}>
            <label>PDF-файл:</label>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            {initial.pdfUrl && (
              <a href={initial.pdfUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block", marginTop: 7, color: "#1388c7", fontWeight: 500 }}>
                Поточний PDF
              </a>
            )}
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