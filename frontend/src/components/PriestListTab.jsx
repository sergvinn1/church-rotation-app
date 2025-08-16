import React, { useState, useEffect } from 'react';
import { getPriests, addPriest, updatePriest, deletePriest } from '../api/rotationApi';

export default function PriestListTab({ isAdmin, token }) {
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
    if (window.confirm('Видалити священника?')) {
      await deletePriest(id, token);
      fetchPriests();
    }
  };

  return (
    <div>
      {isAdmin && <button className="btn" onClick={() => setEdit({})}>+ Додати священника</button>}
      <div>
        {priests.map(item => (
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
        <PriestEditDialog
          initial={edit}
          onClose={() => setEdit(null)}
          onSave={edit._id ? handleEdit : handleAdd}
        />
      )}
    </div>
  );
}