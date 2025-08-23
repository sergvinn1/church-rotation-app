import React, { useState, useEffect } from "react";
import AkathistCard from "./AkathistCard";
import AkathistEditDialog from "./AkathistEditDialog";
import { getAkathists, addAkathist, updateAkathist, deleteAkathist } from "../api/akathistApi";

export default function AkathistsTab({ isAdmin }) {
  const [akathists, setAkathists] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [editAkathist, setEditAkathist] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (showAll || search.trim()) {
      getAkathists(search, sort).then(res => setAkathists(res.data || []));
    } else {
      setAkathists([]);
    }
  }, [search, sort, showAll]);

  const handleSave = async (data) => {
    if (data._id) {
      await updateAkathist(data._id, data);
    } else {
      await addAkathist(data);
    }
    setEditAkathist(null);
    getAkathists(search, sort).then(res => setAkathists(res.data || []));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Видалити акафіст?")) {
      await deleteAkathist(id);
      getAkathists(search, sort).then(res => setAkathists(res.data || []));
    }
  };

  const handleShowAll = () => {
    setSearch("");
    setShowAll(true);
  };

  useEffect(() => {
    if (search.trim()) setShowAll(true);
    else setShowAll(false);
  }, [search]);

  return (
    <div>
      <div className="akathists-filters" style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
        <input
          className="church-input"
          style={{ flex: 2 }}
          placeholder="Пошук по акафістах..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          className={`btn ${showAll ? "btn-blue" : "btn-gray"}`}
          onClick={handleShowAll}
          style={{ fontWeight: showAll ? 700 : 500 }}
        >
          Усі акафісти
        </button>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="church-input"
          style={{ flex: 1 }}
        >
          <option value="name">За назвою</option>
          <option value="number">За номером</option>
        </select>
        {isAdmin && (
          <button
            className="btn btn-green"
            style={{ marginLeft: 8 }}
            onClick={() => setEditAkathist({})}
          >
            + Додати акафіст
          </button>
        )}
      </div>
      {showAll && (
        <div className="akathists-card-list" style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
          {akathists.length === 0 && (
            <div style={{ color: "#888", fontStyle: "italic", margin: "32px auto" }}>
              Немає акафістів, що відповідають пошуку.
            </div>
          )}
          {akathists.map(akathist => (
            <AkathistCard
              key={akathist._id}
              akathist={akathist}
              isAdmin={isAdmin}
              onEdit={() => setEditAkathist(akathist)}
              onDelete={() => handleDelete(akathist._id)}
            />
          ))}
        </div>
      )}
      {isAdmin && (
        <AkathistEditDialog
          open={!!editAkathist}
          initial={editAkathist || {}}
          onClose={() => setEditAkathist(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}