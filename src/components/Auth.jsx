import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="content-box">
      <h2 style={{ textAlign: "center", marginBottom: 16 }}>{isLogin ? "Login" : "Registrieren"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Registrieren"}</button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="switch-btn"
      >
        {isLogin ? "Noch kein Konto? Registrieren" : "Schon ein Konto? Login"}
      </button>
    </div>
  );
} 