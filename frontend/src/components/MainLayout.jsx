import React, { useState, useEffect, useCallback } from 'react';
import PriestScheduleTab from './PriestScheduleTab';
import DeaconScheduleTab from './DeaconScheduleTab';
import PriestListTab from './PriestListTab';
import DeaconListTab from './DeaconListTab';
import IconsTab from './IconsTab';
import AkathistsTab from './AkathistsTab';
import PrayerRitesTab from './PrayerRitesTab';
import LoginDialog from './LoginDialog';
import {
  getPriests, addPriest, updatePriest, deletePriest,
  getPriestSchedules, addPriestSchedule, updatePriestSchedule, deletePriestSchedule
} from '../api/rotationApi';
import '../styles/main.css';

const TABS = [
  { label: 'Розклад духовенства', value: 'schedule' },
  { label: 'Ікони', value: 'icons' },
  { label: 'Акафісти', value: 'akathists' },
  { label: 'Молитовні чини', value: 'prayers' }
];
const ADMIN_TABS = [
  { label: 'Священники (реєстр)', value: 'priests' },
  { label: 'Диякони (реєстр)', value: 'deacons' }
];

// Головний layout, який забезпечує "липкий" футер
export default function MainLayout({ token, setToken, isAdmin, setIsAdmin }) {
  const [tab, setTab] = useState('schedule');
  const [showLogin, setShowLogin] = useState(false);
  const [scheduleTab, setScheduleTab] = useState('priest'); // priest / deacon

  // --- Священники ---
  const [priests, setPriests] = useState([]);
  // --- Розклад священників ---
  const [schedule, setSchedule] = useState([]);
  // --- Діапазон для розкладу ---
  const [scheduleRange, setScheduleRange] = useState([null, null]);

  // --- Завантажити священників ---
  const fetchPriests = useCallback(() => {
    getPriests().then(res => setPriests(res.data));
  }, []);

  // --- Додати/редагувати/видалити священника ---
  const handleAddOrEditPriest = async (priest) => {
    if (priest._id) {
      await updatePriest(priest._id, priest, token);
    } else {
      await addPriest(priest, token);
    }
    fetchPriests();
  };
  const handleDeletePriest = async (_id) => {
    await deletePriest(_id, token);
    fetchPriests();
  };

  // --- Завантажити розклад ---
  const fetchPriestSchedule = useCallback(() => {
    const [from, to] = scheduleRange;
    if (from && to) {
      getPriestSchedules(formatDate(from), formatDate(to)).then(res => setSchedule(res.data));
    } else {
      setSchedule([]);
    }
  }, [scheduleRange]);

  // --- Додати/редагувати/видалити розклад ---
  const handleAddOrEditSchedule = async (entryOrEntries) => {
    if (Array.isArray(entryOrEntries)) {
      for (const entry of entryOrEntries) {
        await addPriestSchedule(entry, token);
      }
    } else if (entryOrEntries._id) {
      await updatePriestSchedule(entryOrEntries._id, entryOrEntries, token);
    } else {
      await addPriestSchedule(entryOrEntries, token);
    }
    fetchPriestSchedule();
  };

  const handleDeleteSchedule = async (_id) => {
    await deletePriestSchedule(_id, token);
    fetchPriestSchedule();
  };

  // --- useEffect on mount ---
  useEffect(() => {
    fetchPriests();
  }, [fetchPriests]);

  useEffect(() => {
    fetchPriestSchedule();
  }, [fetchPriestSchedule]);

  function formatDate(date) {
    if (!date) return '';
    if (typeof date === 'string') return date.slice(0, 10);
    return date.toISOString().slice(0, 10);
  }

  // Структура для sticky footer: #root > .app-content + .footer
  return (
    <div id="root">
      <div className="header" style={{position: 'relative'}}>
        Спасо-Преображенський кафедральний собор
        <button className="login-btn" onClick={() => setShowLogin(true)}>
          {token ? 'Адмін' : 'Увійти'}
        </button>
      </div>

      <div className="tabs">
        {TABS.map(t => (
          <button key={t.value} className={`tab-btn ${tab === t.value ? 'active' : ''}`} onClick={() => setTab(t.value)}>
            {t.label}
          </button>
        ))}
        {isAdmin && ADMIN_TABS.map(t => (
          <button key={t.value} className={`tab-btn ${tab === t.value ? 'active' : ''}`} onClick={() => setTab(t.value)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Контент у flex-елементі для sticky footer */}
      <div className="app-content">
        <div className="panel">
          {tab === 'schedule' && (
            <>
              <div className="sub-tabs">
                <button className={`sub-tab-btn ${scheduleTab === 'priest' ? 'active' : ''}`} onClick={() => setScheduleTab('priest')}>
                  Священники
                </button>
                <button className={`sub-tab-btn ${scheduleTab === 'deacon' ? 'active' : ''}`} onClick={() => setScheduleTab('deacon')}>
                  Диякони
                </button>
              </div>
              {scheduleTab === 'priest' && (
                <PriestScheduleTab
                  isAdmin={isAdmin}
                  token={token}
                  priests={priests}
                  schedule={schedule}
                  onSave={handleAddOrEditSchedule}
                  onDelete={handleDeleteSchedule}
                  dateRange={scheduleRange}
                  setDateRange={setScheduleRange}
                />
              )}
              {scheduleTab === 'deacon' && <DeaconScheduleTab isAdmin={isAdmin} token={token} />}
            </>
          )}
          {tab === 'icons' && <IconsTab isAdmin={isAdmin} />}
          {tab === 'akathists' && <AkathistsTab isAdmin={isAdmin} />}
          {tab === 'prayers' && <PrayerRitesTab isAdmin={isAdmin}/>}
          {tab === 'priests' && isAdmin && (
            <PriestListTab
              isAdmin={isAdmin}
              token={token}
              priests={priests}
              onSave={handleAddOrEditPriest}
              onDelete={handleDeletePriest}
            />
          )}
          {tab === 'deacons' && isAdmin && <DeaconListTab isAdmin={isAdmin} token={token} />}
        </div>
        {showLogin && (
          <LoginDialog
            open={showLogin}
            onClose={() => setShowLogin(false)}
            setToken={setToken}
            setIsAdmin={setIsAdmin}
          />
        )}
      </div>

      {/* Футер на одному рівні вкладеності з .app-content */}
      <div className="footer">
        © 2025 Спасо-Преображенський кафедральний собор. Всі права захищені.
      </div>
    </div>
  );
}