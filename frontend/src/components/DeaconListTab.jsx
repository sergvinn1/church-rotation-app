import React, { useState, useEffect } from 'react';
import { getDeacons, addDeacon, updateDeacon, deleteDeacon } from '../api/rotationApi';

export default function DeaconListTab({ isAdmin, token }) {
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
    if (window.confirm('Видалити диякона?')) {
      await deleteDeacon(id, token);
      fetchDeacons();
    }
  };

  return (
    <div>
      {isAdmin && <button className="btn" onClick={() => setEdit({})}>+ Додати диякона</button>}
      <div>
        {deacons.map(item => (
          <div className="card" key={item._id}>
            <div className="card-title">{item.name}</div>
            <div className="card-meta">{item.rank}</div>
            {isAdmin && (
              <div className="card-actions">
                <button className="btn" onClick={() => setEdit(item)}>Редагувати</button>
                <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Видалити</button>
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