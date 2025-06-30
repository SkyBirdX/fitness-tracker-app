import React, { useState } from "react";
import MealForm from "../components/MealForm";
import { initializeApp } from "firebase/app";

function NutritionPage() {
  const [meals, setMeals] = useState([]);

  return (
    <div>
      <MealForm setMeals={setMeals} />
      {/* Hier kannst du die meals-Liste anzeigen */}
    </div>
  );
}

export default NutritionPage;
