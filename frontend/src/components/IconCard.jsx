export default function IconCard({ icon, isAdmin, onEdit, onDelete }) {
    return (
      <div className="icon-card">
        {icon.photo && (
          <img src={icon.photo} alt={icon.name} className="icon-photo" />
        )}
        <div>
          <b>{icon.name}</b>
          <div>Номер: {icon.number}</div>
          <div>Шафа: {icon.shelf}</div>
          {icon.note && <div className="icon-note">{icon.note}</div>}
        </div>
        {isAdmin && (
          <div className="icon-card-actions">
            <button className="btn btn-blue" onClick={onEdit}>Редагувати</button>
            <button className="btn btn-gray" onClick={onDelete}>Видалити</button>
          </div>
        )}
      </div>
    );
  }