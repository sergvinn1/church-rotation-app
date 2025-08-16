import React, { useState } from 'react';
import MainLayout from './components/MainLayout';

export default function App() {
  const [token, setToken] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <MainLayout token={token} setToken={setToken} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
  );
}