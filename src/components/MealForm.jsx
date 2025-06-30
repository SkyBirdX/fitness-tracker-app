import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, query, where, orderBy, getDocs } from "firebase/firestore";

function MealForm({ setMeals }) {
  const [input, setInput] = useState({ name: "", protein: "", fat: "", carbs: "" });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("Du musst eingeloggt sein!");
      return;
    }

    try {
      await addDoc(collection(db, "meals"), {
        uid: auth.currentUser.uid,
        ...input,
        protein: Number(input.protein),
        fat: Number(input.fat),
        carbs: Number(input.carbs),
        date: new Date(),
      });

      setInput({ name: "", protein: "", fat: "", carbs: "" });

      const q = query(
        collection(db, "meals"),
        where("uid", "==", auth.currentUser.uid),
        orderBy("date", "desc")
      );
      const querySnapshot = await getDocs(q);
      setMeals(querySnapshot.docs.map((doc) => doc.data()));
    } catch (error) {
      alert("Fehler beim Speichern: " + error.message);
    }
  };

  return (
    <form onSubmit={handleAdd}>
      <input
        placeholder="Mahlzeit (z.B. Quark mit Beeren)"
        value={input.name}
        onChange={e => setInput(i => ({ ...i, name: e.target.value }))}
        required
      />
      <input
        type="number"
        placeholder="Protein (g)"
        value={input.protein}
        onChange={e => setInput(i => ({ ...i, protein: e.target.value }))}
        required
      />
      <input
        type="number"
        placeholder="Fett (g)"
        value={input.fat}
        onChange={e => setInput(i => ({ ...i, fat: e.target.value }))}
        required
      />
      <input
        type="number"
        placeholder="Kohlenhydrate (g)"
        value={input.carbs}
        onChange={e => setInput(i => ({ ...i, carbs: e.target.value }))}
        required
      />
      <button type="submit">Mahlzeit hinzufügen</button>
    </form>
  );
}

export default MealForm;
