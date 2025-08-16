import React, { useState } from 'react';
import PriestScheduleTab from './PriestScheduleTab';
import DeaconScheduleTab from './DeaconScheduleTab';
import PriestListTab from './PriestListTab';
import DeaconListTab from './DeaconListTab';
import IconsTab from './IconsTab';
import AkathistsTab from './AkathistsTab';
import PrayersTab from './PrayersTab';
import LoginDialog from './LoginDialog';
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

export default function MainLayout({ token, setToken, isAdmin, setIsAdmin }) {
  const [tab, setTab] = useState('schedule');
  const [showLogin, setShowLogin] = useState(false);
  const [scheduleTab, setScheduleTab] = useState('priest'); // priest / deacon

  return (
    <div>
      <div className="header" style={{position: 'relative'}}>
        Спасо-Преображенський кафедральний собор
        <button className="login-btn" onClick={() => setShowLogin(true)}>
          {token ? 'Адмін' : 'Увійти'}
        </button>
      </div>

      <div className="tabs">
        {TABS.map(t => (
          <button
            key={t.value}
            className={`tab-btn ${tab === t.value ? 'active' : ''}`}
            onClick={() => setTab(t.value)}
          >
            {t.label}
          </button>
        ))}
        {isAdmin && ADMIN_TABS.map(t => (
          <button
            key={t.value}
            className={`tab-btn ${tab === t.value ? 'active' : ''}`}
            onClick={() => setTab(t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="panel">
        {tab === 'schedule' && (
          <>
            <div className="sub-tabs">
              <button
                className={`sub-tab-btn ${scheduleTab === 'priest' ? 'active' : ''}`}
                onClick={() => setScheduleTab('priest')}
              >
                Священники
              </button>
              <button
                className={`sub-tab-btn ${scheduleTab === 'deacon' ? 'active' : ''}`}
                onClick={() => setScheduleTab('deacon')}
              >
                Диякони
              </button>
            </div>
            {scheduleTab === 'priest' && <PriestScheduleTab isAdmin={isAdmin} token={token} />}
            {scheduleTab === 'deacon' && <DeaconScheduleTab isAdmin={isAdmin} token={token} />}
          </>
        )}
        {tab === 'icons' && <IconsTab />}
        {tab === 'akathists' && <AkathistsTab />}
        {tab === 'prayers' && <PrayersTab />}
        {tab === 'priests' && isAdmin && <PriestListTab isAdmin={isAdmin} token={token} />}
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

      <div className="footer">
        © 2025 Спасо-Преображенський кафедральний собор. Всі права захищені.
      </div>
    </div>
  );
}