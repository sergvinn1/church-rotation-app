import React, { useState, useEffect } from "react";


export default function DeaconEditDialog({ initial = {}, onClose, onSave }) {
  const [name, setName] = useState(initial.name || "");
  const [rank, setRank] = useState(initial.rank || "");

  useEffect(() => {
    setName(initial.name || "");
    setRank(initial.rank || "");
  }, [initial, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !rank.trim()) return;
    onSave({ ...initial, name: name.trim(), rank: rank.trim() });
    setName("");
    setRank("");
  };

  const handleClose = () => {
    setName("");
    setRank("");
    onClose();
  };

  return (
    <div className="church-modal-bg">
      <form className="church-modal" onSubmit={handleSubmit}>
        <h3>Додати диякона</h3>
        <div className="church-form-row">
          <div style={{ flex: 1 }}>
            <label>Ім'я</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Введіть ім'я"
              required
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Сан</label>
            <input
              type="text"
              value={rank}
              onChange={e => setRank(e.target.value)}
              placeholder="напр. диякон, протодиякон..."
              required
            />
          </div>
        </div>
        <div className="church-btn-row">
          <button type="submit" className="btn-save">Зберегти</button>
          <button type="button" className="btn-cancel" onClick={handleClose}>Скасувати</button>
        </div>
      </form>
    </div>
  );
}