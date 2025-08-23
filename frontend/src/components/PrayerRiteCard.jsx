import React from "react";

const API_HOST = "http://localhost:4000"; // ← змініть на свій бекенд, якщо потрібно

export default function PrayerRiteCard({ rite, isAdmin, onEdit, onDelete, onView }) {
  // Перевіряємо, чи rite.pdfUrl вже містить повний шлях
  const pdfLink = rite.pdfUrl
    ? rite.pdfUrl.startsWith("http") ? rite.pdfUrl : API_HOST + rite.pdfUrl
    : null;

  return (
    <div
      style={{
        background: "var(--panel-bg)",
        borderRadius: "18px",
        boxShadow: "var(--shadow)",
        padding: "22px 28px 16px 28px",
        minWidth: 220,
        maxWidth: 320,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        position: "relative",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: "1.18em", marginBottom: 7, color: "var(--main-blue)" }}>
        {rite.name}
      </div>
      <div style={{ color: "#888", fontSize: "0.98em" }}>
        Популярність: <b>{rite.popularity || 0}</b>
      </div>
      {pdfLink ? (
        <a
          href={pdfLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-blue"
          style={{ marginTop: 12, width: "fit-content" }}
          onClick={onView}
        >
          Переглянути PDF
        </a>
      ) : (
        <div style={{ color: "#c22" }}>PDF не додано</div>
      )}
      {isAdmin && (
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button className="btn btn-edit" onClick={onEdit}>Редагувати</button>
          <button className="btn btn-delete" onClick={onDelete}>Видалити</button>
        </div>
      )}
    </div>
  );
}