import React, { useState, useEffect } from "react";
import { getPriests, addPriest, updatePriest, deletePriest } from "../api/rotationApi";
import PriestEditDialog from "./PriestEditDialog";


export default function PriestListTab({ token, isAdmin }) {
  const [priests, setPriests] = useState([]);
  const [edit, setEdit] = useState(null);

  const fetchPriests = async () => {
    const res = await getPriests();
    setPriests(res.data);
  };

  useEffect(() => { fetchPriests(); }, []);

  const handleAdd = async (data) => {
    await addPriest(data, token);
    fetchPriests();
  };

  const handleEdit = async (data) => {
    await updatePriest(data._id, data, token);
    setEdit(null);
    fetchPriests();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Видалити священника?")) {
      await deletePriest(id, token);
      fetchPriests();
    }
  };

  return (
    <div className="priest-list-container">
      <div className="priest-list-header">Священники (реєстр)</div>
      {isAdmin && (
        <button className="priest-list-btn-add" onClick={() => setEdit({})}>
          + Додати священника
        </button>
      )}
      <div>
        {priests.map(item => (
          <div className="priest-card" key={item._id}>
            <div className="priest-card-info">
              <div className="priest-card-rank">{item.rank}</div>
              <div className="priest-card-name">{item.name}</div>
            </div>
            {isAdmin && (
              <div className="priest-card-actions">
                <button className="btn-edit" onClick={() => setEdit(item)}>
                  Редагувати
                </button>
                <button className="btn-delete" onClick={() => handleDelete(item._id)}>
                  Видалити
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {edit && (
        <PriestEditDialog
          initial={edit}
          onClose={() => setEdit(null)}
          onSave={edit._id ? handleEdit : handleAdd}
        />
      )}
    </div>
  );
}