import React, { useEffect, useState, useRef } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot, deleteDoc, doc, orderBy } from "firebase/firestore";

const useSwipe = (onSwipeLeft) => {
  const touchSurface = useRef(null);
  const xDown = useRef(null);
  const yDown = useRef(null);

  useEffect(() => {
    const handleTouchStart = (evt) => {
      xDown.current = evt.touches[0].clientX;
      yDown.current = evt.touches[0].clientY;
    };

    const handleTouchMove = (evt) => {
      if (!xDown.current || !yDown.current) return;

      let xUp = evt.touches[0].clientX;
      let yUp = evt.touches[0].clientY;

      let xDiff = xDown.current - xUp;
      let yDiff = yDown.current - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          onSwipeLeft();
        }
      }
      xDown.current = null;
      yDown.current = null;
    };

    const surface = touchSurface.current;
    if (surface) {
        surface.addEventListener('touchstart', handleTouchStart, { passive: true });
        surface.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    return () => {
        if (surface) {
            surface.removeEventListener('touchstart', handleTouchStart);
            surface.removeEventListener('touchmove', handleTouchMove);
        }
    };
  }, [onSwipeLeft]);

  return touchSurface;
};


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
      where("uid", "==", auth.currentUser.uid),
      orderBy("date", "desc") // Sortiert die neusten zuerst
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