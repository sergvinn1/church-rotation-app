import React, { useState, useEffect } from "react";
import DeaconEditDialog from "./DeaconEditDialog";
import { getDeacons, addDeacon, updateDeacon, deleteDeacon } from "../api/rotationApi";


export default function DeaconListTab({ token, isAdmin }) {
  const [deacons, setDeacons] = useState([]);
  const [edit, setEdit] = useState(null);

  const fetchDeacons = async () => {
    const res = await getDeacons();
    setDeacons(res.data);
  };

  useEffect(() => { fetchDeacons(); }, []);

  const handleAdd = async (data) => {
    await addDeacon(data, token);
    fetchDeacons();
  };

  const handleEdit = async (data) => {
    await updateDeacon(data._id, data, token);
    setEdit(null);
    fetchDeacons();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Видалити диякона?")) {
      await deleteDeacon(id, token);
      fetchDeacons();
    }
  };

  return (
    <div className="priest-list-container">
      <div className="priest-list-header">Диякони (реєстр)</div>
      {isAdmin && (
        <button className="priest-list-btn-add" onClick={() => setEdit({})}>
          + Додати диякона
        </button>
      )}
      <div>
        {deacons.map(item => (
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
        <DeaconEditDialog
          initial={edit}
          onClose={() => setEdit(null)}
          onSave={edit._id ? handleEdit : handleAdd}
        />
      )}
    </div>
  );
}