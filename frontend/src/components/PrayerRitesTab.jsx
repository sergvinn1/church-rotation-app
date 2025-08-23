import React, { useState, useEffect } from "react";
import PrayerRiteCard from "./PrayerRiteCard";
import PrayerRiteEditDialog from "./PrayerRiteEditDialog";
import { getPrayerRites, addPrayerRite, updatePrayerRite, deletePrayerRite, incrementPopularity } from "../api/prayerRiteApi";

export default function PrayerRitesTab({ isAdmin }) {
  const [rites, setRites] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [editRite, setEditRite] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (showAll || search.trim()) {
      getPrayerRites(search, sort).then(res => setRites(res.data || []));
    } else {
      setRites([]);
    }
  }, [search, sort, showAll]);

  const handleSave = async (data, pdfFile) => {
    if (data._id) {
      await updatePrayerRite(data._id, data, pdfFile);
    } else {
      await addPrayerRite(data, pdfFile);
    }
    setEditRite(null);
    getPrayerRites(search, sort).then(res => setRites(res.data || []));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Видалити чин?")) {
      await deletePrayerRite(id);
      getPrayerRites(search, sort).then(res => setRites(res.data || []));
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

  // Збільшуємо популярність при перегляді
  const handleView = async (id) => {
    await incrementPopularity(id);
    getPrayerRites(search, sort).then(res => setRites(res.data || []));
  };

  return (
    <div>
      <div className="prayer-rites-filters" style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
        <input
          className="church-input"
          style={{ flex: 2 }}
          placeholder="Пошук по назві чину..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          className={`btn ${showAll ? "btn-blue" : "btn-gray"}`}
          onClick={handleShowAll}
          style={{ fontWeight: showAll ? 700 : 500 }}
        >
          Усі чини
        </button>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="church-input"
          style={{ flex: 1 }}
        >
          <option value="name">За назвою</option>
          <option value="popularity">За популярністю</option>
        </select>
        {isAdmin && (
          <button
            className="btn btn-green"
            style={{ marginLeft: 8 }}
            onClick={() => setEditRite({})}
          >
            + Додати чин
          </button>
        )}
      </div>
      {showAll && (
        <div className="prayer-rites-card-list" style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
          {rites.length === 0 && (
            <div style={{ color: "#888", fontStyle: "italic", margin: "32px auto" }}>
              Немає чинів, що відповідають пошуку.
            </div>
          )}
          {rites.map(rite => (
            <PrayerRiteCard
              key={rite._id}
              rite={rite}
              isAdmin={isAdmin}
              onEdit={() => setEditRite(rite)}
              onDelete={() => handleDelete(rite._id)}
              onView={() => handleView(rite._id)}
            />
          ))}
        </div>
      )}
      {isAdmin && (
        <PrayerRiteEditDialog
          open={!!editRite}
          initial={editRite || {}}
          onClose={() => setEditRite(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}