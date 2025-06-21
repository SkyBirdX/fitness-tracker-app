// src/components/WorkoutList.js
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(
      collection(db, "workouts"),
      where("uid", "==", auth.currentUser.uid)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setWorkouts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, [auth.currentUser]);

  return (
    <div>
      <h2>Deine Workouts</h2>
      <ul>
        {workouts.map(w => (
          <li key={w.id}>{w.type} – {w.duration} Minuten ({w.date?.toDate?.().toLocaleString?.() || ""})</li>
        ))}
      </ul>
    </div>
  );
}