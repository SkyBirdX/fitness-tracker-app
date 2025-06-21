import React, { useEffect, useState } from "react";
import Auth from "./components/Auth.jsx";
import AddWorkout from "./components/AddWorkout.jsx";
import WorkoutList from "./components/WorkoutList.jsx";
import { auth } from "./firebase";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="app-container">
      <h1>Fitness Tracker</h1>
      {!user ? (
        <Auth />
      ) : (
        <>
          <p>Hallo, {user.email}!</p>
          <button onClick={() => auth.signOut()}>Logout</button>
          <AddWorkout />
          <WorkoutList />
        </>
      )}
    </div>
  );
}

export default App;