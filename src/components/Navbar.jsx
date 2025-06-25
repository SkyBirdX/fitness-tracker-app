import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ userEmail, onLogout }) {
  return (
    <header className="top-navbar">
      <div className="navbar-brand">
        Fitness Tracker
      </div>
      <nav className="navbar-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Profil
        </NavLink>
        <NavLink to="/exercises" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Übungen
        </NavLink>
        <NavLink to="/nutrition" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Ernährung
        </NavLink>
      </nav>
      <div className="navbar-user-info">
        <span>{userEmail}</span>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>
    </header>
  );
} 