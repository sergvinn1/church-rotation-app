/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.role); // передаємо роль
    } catch (err) {
      setError("Невірний логін або пароль");
    }
  };

  return (
    <form onSubmit={submit}>
      <h3>Логін</h3>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Увійти</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
};

export default LoginForm;