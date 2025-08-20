import React, { useState } from "react";
import PriestRegister from "../components/PriestRegister"; // список+додавання/редагування
import PriestScheduleTab from "../components/PriestScheduleTab";

export default function PriestPage() {
  // Єдиний state для всіх священників
  const [priests, setPriests] = useState([
    // стартовий список (можна залишити []), у бойовому — отримувати з бекенду
    // { _id: "1", name: "Віталій Голоскевич", rank: "протоієрей" },
    // ...
  ]);

  // Додавання/редагування/видалення — функції, які передаємо у реєстр
  const handleAddOrEdit = (priest) => {
    if (priest._id) {
      setPriests(prev =>
        prev.map(p => (p._id === priest._id ? priest : p))
      );
    } else {
      setPriests(prev => [
        ...prev,
        { ...priest, _id: Date.now().toString() + Math.random() }
      ]);
    }
  };

  const handleDelete = _id => setPriests(prev => prev.filter(p => p._id !== _id));
console.log("PriestPage priests:", priests);
  return (
    <div>
      <h2>Священники (реєстр)</h2>
      <PriestRegister
        priests={priests}
        onSave={handleAddOrEdit}
        onDelete={handleDelete}
      />
      <hr style={{margin: "32px 0"}} />
      <PriestScheduleTab
        isAdmin={true}
        priests={priests}
      />
    </div>
  );
}