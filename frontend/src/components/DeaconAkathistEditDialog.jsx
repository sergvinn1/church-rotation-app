import React, { useState, useEffect } from "react";

export default function DeaconAkathistEditDialog({
  open,
  initial = {},
  deacons = [],
  onClose,
  onSave
}) {
  const [akathistDate, setAkathistDate] = useState(initial.akathistDate || "");
  const [deaconId, setDeaconId] = useState(initial.akathistDeacon || "");

  useEffect(() => {
    setAkathistDate(initial.akathistDate || "");
    setDeaconId(initial.akathistDeacon || "");
  }, [initial, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!akathistDate || !deaconId) {
      alert("Заповніть всі поля!");
      return;
    }
    if (typeof onSave === "function") {
      onSave({
        ...initial,
        akathistDate,
        akathistDeacon: deaconId,
      });
    }
  };

  if (!open) return null;

  return (
    <div className="church-modal-bg">
      <form className="church-modal" onSubmit={handleSubmit}>
        <div className="modal-title">
          Додати розклад акафісту для диякона
        </div>
        <div className="church-form-row">
          <div style={{ flex: 1 }}>
            <label>Дата акафісту:</label>
            <input
              type="date"
              className="church-input"
              value={akathistDate}
              onChange={e => setAkathistDate(e.target.value)}
              required
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Диякон:</label>
            <select
              className="church-input"
              value={deaconId}
              onChange={e => setDeaconId(e.target.value)}
              required
            >
              <option value="">Оберіть диякона</option>
              {deacons.map(d => (
                <option key={d._id} value={d._id}>
                  {(d.rank ? d.rank + " " : "") + d.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="church-btn-row">
          <button type="submit" className="btn btn-green">
            Зберегти
          </button>
          <button type="button" className="btn btn-gray" onClick={onClose}>
            Скасувати
          </button>
        </div>
      </form>
    </div>
  );
}