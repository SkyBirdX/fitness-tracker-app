import React, { useState } from "react";
import { exerciseData } from "../data/exerciseData";
import FiltersBar from "../components/FiltersBar";
import ExerciseCard from "../components/ExerciseCard";

export default function ExercisesPage() {
  const [filters, setFilters] = useState({ target: null, type: null, equipment: null, level: null });

  // Filterlogik (Trainingsart ist im Beispiel-Datensatz noch nicht enthalten)
  const filteredExercises = exerciseData.filter((ex) => {
    return (
      (!filters.target || ex.target === filters.target) &&
      (!filters.equipment || ex.equipment === filters.equipment) &&
      (!filters.level || ex.level === filters.level)
      // Trainingsart kann ergänzt werden, wenn im Datensatz vorhanden
    );
  });

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem" }}>
      <h1>Übungen</h1>
      <FiltersBar filters={filters} setFilters={setFilters} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
        {filteredExercises.length === 0 ? (
          <p>Keine Übungen gefunden.</p>
        ) : (
          filteredExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))
        )}
      </div>
    </div>
  );
} 