import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";

const macroGoals = {
  protein: 120,
  fat: 70,
  carbs: 250
};

export default function NutritionPage() {
  const [meals, setMeals] = useState([]);
  const [input, setInput] = useState({ name: "", protein: "", fat: "", carbs: "" });

  
  useEffect(() => {
    if (!auth.currentUser) return;
    const fetchMeals = async () => {
      const q = query(
        collection(db, "meals"),
        where("uid", "==", auth.currentUser.uid),
        orderBy("date", "desc")
      );
      const querySnapshot = await getDocs(q);
      setMeals(querySnapshot.docs.map(doc => doc.data()));
    };
    fetchMeals();
  }, [auth.currentUser]);

  const total = meals.reduce((acc, m) => ({
    protein: acc.protein + Number(m.protein),
    fat: acc.fat + Number(m.fat),
    carbs: acc.carbs + Number(m.carbs)
  }), { protein: 0, fat: 0, carbs: 0 });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!input.name || !input.protein || !input.fat || !input.carbs) return;
    if (!auth.currentUser) {
      alert("Du musst eingeloggt sein!");
      return;
    }
    try {
      await addDoc(collection(db, "meals"), {
        uid: auth.currentUser.uid,
        name: input.name,
        protein: Number(input.protein),
        fat: Number(input.fat),
        carbs: Number(input.carbs),
        date: new Date()
      });
      setMeals([{ ...input }, ...meals]); 
      setInput({ name: "", protein: "", fat: "", carbs: "" });
    } catch (error) {
      alert("Fehler beim Speichern: " + error.message);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "2rem" }}>
      <h1>🥗 Ernährung & Makros</h1>
      <form onSubmit={handleAdd} style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        <input
          placeholder="Mahlzeit (z.B. Quark mit Beeren)"
          value={input.name}
          onChange={e => setInput(i => ({ ...i, name: e.target.value }))}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="number"
            placeholder="Protein (g)"
            value={input.protein}
            onChange={e => setInput(i => ({ ...i, protein: e.target.value }))}
            style={{ flex: 1 }}
          />
          <input
            type="number"
            placeholder="Fett (g)"
            value={input.fat}
            onChange={e => setInput(i => ({ ...i, fat: e.target.value }))}
            style={{ flex: 1 }}
          />
          <input
            type="number"
            placeholder="Kohlenhydrate (g)"
            value={input.carbs}
            onChange={e => setInput(i => ({ ...i, carbs: e.target.value }))}
            style={{ flex: 1 }}
          />
        </div>
        <button type="submit">Mahlzeit hinzufügen</button>
      </form>
      <div style={{ background: "rgba(17,24,39,0.7)", borderRadius: 16, padding: 18, marginBottom: 24 }}>
        <h3 style={{ color: "#c4b5fd" }}>Tagesübersicht</h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {meals.map((m, idx) => (
            <li key={idx} style={{ marginBottom: 6 }}>
              <strong>{m.name}</strong>: {m.protein}g Protein, {m.fat}g Fett, {m.carbs}g KH
            </li>
          ))}
        </ul>
      </div>
      <div style={{ background: "#1e1b4b", borderRadius: 16, padding: 18, color: "#fff" }}>
        <h3 style={{ color: "#a78bfa" }}>Makronährstoff-Fortschritt</h3>
        <div style={{ marginBottom: 8 }}>
          <strong>Protein:</strong> {total.protein}g / {macroGoals.protein}g
          <span style={{ color: '#f472b6', marginLeft: 8 }}>
            {total.protein < macroGoals.protein ? `Heute fehlen dir noch ${macroGoals.protein - total.protein}g Protein` : "Ziel erreicht!"}
          </span>
        </div>
        <div style={{ marginBottom: 8 }}>
          <strong>Fett:</strong> {total.fat}g / {macroGoals.fat}g
        </div>
        <div>
          <strong>Kohlenhydrate:</strong> {total.carbs}g / {macroGoals.carbs}g
        </div>
      </div>
    </div>
  );
} 