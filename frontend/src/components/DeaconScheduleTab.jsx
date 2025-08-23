import React, { useState, useEffect } from "react";
import DeaconScheduleCard from "./DeaconScheduleCard";
import DeaconScheduleEditDialog from "./DeaconScheduleEditDialog";
import DeaconAkathistEditDialog from "./DeaconAkathistEditDialog";
import {
  getDeaconSchedules,
  addDeaconSchedule,
  updateDeaconSchedule,
  deleteDeaconSchedule,
  getDeacons,
  getDeaconAkathists,       // нові функції!
  addDeaconAkathist,
  deleteDeaconAkathist
} from "../api/rotationApi";

export default function DeaconScheduleTab({ token, isAdmin }) {
  const [schedules, setSchedules] = useState([]);
  const [akathists, setAkathists] = useState([]); // акафісти окремо
  const [deacons, setDeacons] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // для акафісту
  const [editWeek, setEditWeek] = useState(null);
  const [editAkathist, setEditAkathist] = useState(null);

  // Завантажити список дияконів
  useEffect(() => {
    getDeacons().then(res => setDeacons(res.data || []));
  }, []);

  // Завантажити розклад дияконів
  useEffect(() => {
    getDeaconSchedules(from, to).then(res => setSchedules(res.data || []));
  }, [from, to]);

  // Завантажити акафісти (за датою)
  useEffect(() => {
    if (selectedDate) {
      getDeaconAkathists(selectedDate).then(res => setAkathists(res.data || []));
    } else {
      setAkathists([]);
    }
  }, [selectedDate]);

  // Зберегти/редагувати розклад на тиждень
  const handleAddOrEditWeek = async (data) => {
    if (data._id) {
      await updateDeaconSchedule(data._id, data, token);
    } else {
      await addDeaconSchedule(data, token);
    }
    setEditWeek(null);
    getDeaconSchedules(from, to).then(res => setSchedules(res.data || []));
  };

  // Додати акафіст
  const handleAddAkathist = async (data) => {
    await addDeaconAkathist({
      date: data.akathistDate,
      deacon: data.akathistDeacon
    }, token);
    setEditAkathist(null);
    if (selectedDate) {
      getDeaconAkathists(selectedDate).then(res => setAkathists(res.data || []));
    }
  };

  // Видалити акафіст
  const handleDeleteAkathist = async (id) => {
    if (window.confirm("Видалити розклад акафісту?")) {
      await deleteDeaconAkathist(id, token);
      if (selectedDate) {
        getDeaconAkathists(selectedDate).then(res => setAkathists(res.data || []));
      }
    }
  };

  // Видалити розклад диякона
  const handleDelete = async (id) => {
    if (window.confirm("Видалити розклад?")) {
      await deleteDeaconSchedule(id, token);
      getDeaconSchedules(from, to).then(res => setSchedules(res.data || []));
    }
  };

  // Діапазон дат вибраний?
  const isRangeSelected = !!from && !!to;

  return (
    <div>
      <div className="deacon-filters">
        <div className="deacon-dates-row">
          <label>З</label>
          <input className="church-input" type="date" value={from} onChange={e => setFrom(e.target.value)} />
          <span style={{fontWeight:600, fontSize:17, margin:"0 12px"}}>—</span>
          <label>По</label>
          <input className="church-input" type="date" value={to} onChange={e => setTo(e.target.value)} />
          {isAdmin && (
            <div className="deacon-action-btns">
              <button className="btn btn-green" onClick={() => setEditWeek({})}>+ Додати розклад на тиждень</button>
              <button className="btn btn-blue" onClick={() => setEditAkathist({ akathistDate: selectedDate })}>+ Додати акафіст</button>
            </div>
          )}
        </div>
        <div className="deacon-akathist-row">
          <label>Обрати дату акафісту:</label>
          <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="church-input" />
        </div>
      </div>

      {/* Розклад дияконів на тиждень — тільки якщо вибрано діапазон дат */}
      {isRangeSelected ? (
        <div className="schedule-cards-container">
          {schedules.map(item => (
            <DeaconScheduleCard
              key={item._id}
              schedule={item}
              isAdmin={isAdmin}
              onEdit={() => setEditWeek(item)}
              onDelete={() => handleDelete(item._id)}
              highlightAkathist={false}
              deacons={deacons}
            />
          ))}
        </div>
      ) : (
        <div style={{ marginTop: 12, color: "#888", fontStyle: "italic" }}>
          Оберіть діапазон дат для перегляду розкладу.
        </div>
      )}

      {/* Картки акафісту (якщо вибрано дату) */}
      {selectedDate && akathists.length > 0 && (
        <div className="schedule-cards-container">
          {akathists.map(item => (
            <DeaconScheduleCard
              key={item._id + "_akathist"}
              schedule={{
                akathistDate: item.date,
                akathistDeacon: item.deacon
              }}
              isAdmin={isAdmin}
              onEdit={() => setEditAkathist({
                akathistDate: item.date,
                akathistDeacon: item.deacon,
                _id: item._id
              })}
              onDelete={() => handleDeleteAkathist(item._id)}
              showOnlyAkathist={true}
              deacons={deacons}
            />
          ))}
        </div>
      )}

      {/* Модалка для розкладу на тиждень */}
      <DeaconScheduleEditDialog
        open={!!editWeek}
        initial={editWeek || {}}
        deacons={deacons}
        onClose={() => setEditWeek(null)}
        onSave={handleAddOrEditWeek}
      />

      {/* Модалка для акафісту */}
      <DeaconAkathistEditDialog
        open={!!editAkathist}
        initial={editAkathist || {}}
        deacons={deacons}
        onClose={() => setEditAkathist(null)}
        onSave={handleAddAkathist}
      />
    </div>
  );
}