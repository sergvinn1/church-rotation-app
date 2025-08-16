import React, { useState } from "react";
import axios from "axios";

const AdminRegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axios.post("http://localhost:4000/api/auth/register", {
        username,
        email,
        password,
        role: "admin"
      });
      setSuccess("Адміністратор зареєстрований!");
      setUsername(""); setEmail(""); setPassword("");
      if (onRegister) onRegister();
    } catch (err) {
      setError(err.response?.data?.message || "Помилка реєстрації");
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 350, margin: "30px auto", padding: 20, background: "#f7f7f7", borderRadius: 8 }}>
      <h3>Реєстрація адміністратора</h3>
      <label>Логін:</label>
      <input value={username} onChange={e => setUsername(e.target.value)} required />
      <label>Email:</label>
      <input value={email} type="email" onChange={e => setEmail(e.target.value)} required />
      <label>Пароль:</label>
      <input value={password} type="password" onChange={e => setPassword(e.target.value)} required />
      <button type="submit" style={{ marginTop: 10 }}>Зареєструвати</button>
      {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
      {success && <div style={{ color: "green", marginTop: 10 }}>{success}</div>}
    </form>
  );
};

export default AdminRegisterForm;