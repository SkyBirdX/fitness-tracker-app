import React, { useEffect, useState, useRef } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";

// (Code für den useSwipe Hook bleibt hier)

export default function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  const [swipedItemId, setSwipedItemId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "workouts", id));
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

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
  }, []);

  const handleSwipeLeft = (id) => {
    setSwipedItemId(id);
  };

  const resetSwipe = () => {
    setSwipedItemId(null);
  };
  
  return (
    <div className="content-box workout-list" onMouseLeave={resetSwipe}>
      <h2>Deine Workouts</h2>
      <ul>
        {workouts.map(w => (
          <li 
            key={w.id} 
            className={`workout-item-container ${swipedItemId === w.id ? 'swiped' : ''}`}
            >
            <div className="workout-item-content" onMouseDown={() => handleSwipeLeft(w.id)} onTouchStart={() => handleSwipeLeft(w.id)}>
                <span>{w.type} – {w.duration} Minuten</span>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(w.id)}>
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}