import React, { useState, useEffect } from "react";
import IconCard from "./IconCard";
import IconEditDialog from "./IconEditDialog";
import { getIcons, addIcon, updateIcon, deleteIcon } from "../api/iconApi";

export default function IconsTab({ isAdmin }) {
  const [icons, setIcons] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [editIcon, setEditIcon] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Завантажити ікони при зміні пошуку/сортування
  useEffect(() => {
    if (showAll || search.trim()) {
      getIcons(search, sort).then(res => setIcons(res.data || []));
    } else {
      setIcons([]);
    }
  }, [search, sort, showAll]);

  // Зберегти (додавання/редагування) ікону
  const handleSave = async (data) => {
    if (data._id) {
      await updateIcon(data._id, data);
    } else {
      await addIcon(data);
    }
    setEditIcon(null);
    getIcons(search, sort).then(res => setIcons(res.data || []));
  };

  // Видалити ікону
  const handleDelete = async (id) => {
    if (window.confirm("Видалити ікону?")) {
      await deleteIcon(id);
      getIcons(search, sort).then(res => setIcons(res.data || []));
    }
  };

  // Скинути пошук і показати всі ікони
  const handleShowAll = () => {
    setSearch("");
    setShowAll(true);
  };

  // Якщо користувач щось шукає — автоматично показуємо результати
  useEffect(() => {
    if (search.trim()) setShowAll(true);
    else setShowAll(false);
  }, [search]);

  return (
    <div>
      <div className="icons-filters" style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
        <input
          className="church-input"
          style={{ flex: 2 }}
          placeholder="Пошук по іконах..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          className={`btn ${showAll ? "btn-blue" : "btn-gray"}`}
          onClick={handleShowAll}
          style={{ fontWeight: showAll ? 700 : 500 }}
        >
          Усі ікони
        </button>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="church-input"
          style={{ flex: 1 }}
        >
          <option value="name">За назвою</option>
          <option value="number">За номером</option>
          <option value="shelf">За номером шафи</option>
        </select>
        {isAdmin && (
          <button
            className="btn btn-green"
            style={{ marginLeft: 8 }}
            onClick={() => setEditIcon({})}
          >
            + Додати ікону
          </button>
        )}
      </div>
      {showAll && (
        <div className="icons-card-list" style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
          {icons.length === 0 && (
            <div style={{ color: "#888", fontStyle: "italic", margin: "32px auto" }}>
              Немає ікон, що відповідають пошуку.
            </div>
          )}
          {icons.map(icon => (
            <IconCard
              key={icon._id}
              icon={icon}
              isAdmin={isAdmin}
              onEdit={() => setEditIcon(icon)}
              onDelete={() => handleDelete(icon._id)}
            />
          ))}
        </div>
      )}
      {isAdmin && (
        <IconEditDialog
          open={!!editIcon}
          initial={editIcon || {}}
          onClose={() => setEditIcon(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}