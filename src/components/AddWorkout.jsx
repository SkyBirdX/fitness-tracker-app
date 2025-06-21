// src/components/AddWorkout.js
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
    await addDoc(collection(db, "workouts"), {
      uid: auth.currentUser.uid,
      type,
      duration,
      date: new Date()
    });
    setType("");
    setDuration("");
    alert("Workout gespeichert!");
  };

  return (
    <form onSubmit={handleAdd}>
      <input value={type} onChange={e => setType(e.target.value)} placeholder="Workout-Typ" required />
      <input value={duration} onChange={e => setDuration(e.target.value)} placeholder="Dauer (Minuten)" required />
      <button type="submit">Workout speichern</button>
    </form>
  );
}