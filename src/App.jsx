import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth.jsx";
import AddWorkout from "./components/AddWorkout.jsx";
import WorkoutList from "./components/WorkoutList.jsx";
import Navbar from "./components/Navbar.jsx";
import ExercisesPage from "./pages/ExercisesPage.jsx";
import NutritionPage from "./pages/NutritionPage.jsx";
import { auth } from "./firebase";
import "./App.css";

const Dashboard = () => (
  <div className="content-wrapper">
    <AddWorkout />
    <WorkoutList />
  </div>
);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white', backgroundColor: '#111827' }}>Loading...</div>;
  }

  return (
    <div className="app-wrapper">
      {!user ? (
        <div className="auth-container">
            <Auth />
        </div>
      ) : (
        <>
          <Navbar userEmail={user.email} onLogout={() => auth.signOut()} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/exercises" element={<ExercisesPage />} />
              <Route path="/nutrition" element={<NutritionPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </>
      )}
    </div>
  );
}

export default App; 