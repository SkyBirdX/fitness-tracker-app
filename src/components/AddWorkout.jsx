import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddWorkout() {
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("Bitte einloggen!");
      return;
    }
    try {
        await addDoc(collection(db, "workouts"), {
            uid: auth.currentUser.uid,
            type,
            duration,
            date: new Date()
        });
        setType("");
        setDuration("");
    } catch (error) {
        alert("Fehler beim Speichern des Workouts.");
    }
  };

  return (
    <div className="content-box" style={{ marginBottom: '20px' }}>
        <h2>Neues Workout</h2>
        <form onSubmit={handleAdd}>
            <input
                value={type}
                onChange={e => setType(e.target.value)}
                placeholder="Workout-Typ (z.B. Laufen, Krafttraining)"
                required
            />
            <input
                value={duration}
                onChange={e => setDuration(e.target.value)}
                placeholder="Dauer (Minuten)"
                type="number"
                required
            />
            <button type="submit">Workout speichern</button>
        </form>
    </div>
  );
}