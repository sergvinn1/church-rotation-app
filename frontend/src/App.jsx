import React, { useState } from 'react';
import MainLayout from './components/MainLayout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRegisterForm from "./components/AdminRegisterForm";

export default function App() {
  const [token, setToken] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <MainLayout
              token={token}
              setToken={setToken}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
            />
          }
        />
        <Route path="/admin-register" element={<AdminRegisterForm />} />
      </Routes>
    </Router>
  );
}