import React from "react";

const muscleGroups = ["Brust", "Rücken", "Beine", "Bizeps"];
const trainingTypes = ["Kraft", "Ausdauer", "Mobility"];
const equipmentTypes = ["Körpergewicht", "Kurzhantel"];
const levels = ["Anfänger", "Fortgeschritten", "Profi"];

const buttonBase = {
  minWidth: 90,
  padding: "8px 18px",
  margin: "0 0.5rem 0.5rem 0",
  border: "none",
  borderRadius: 12,
  fontWeight: 600,
  fontSize: 15,
  background: "linear-gradient(90deg, #312e81 0%, #4c1d95 100%)",
  color: "#a78bfa",
  cursor: "pointer",
  transition: "all 0.2s"
};

const buttonActive = {
  background: "linear-gradient(90deg, #8b5cf6 0%, #d946ef 100%)",
  color: "#fff",
  boxShadow: "0 2px 8px rgba(139,92,246,0.15)"
};

const groupTitle = {
  color: "#c4b5fd",
  fontWeight: 700,
  fontSize: 16,
  marginRight: 8
};

export default function FiltersBar({ filters, setFilters }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", marginBottom: "2.5rem", justifyContent: "center" }}>
      <div>
        <span style={groupTitle}>Muskelgruppe:</span>
        {muscleGroups.map((group) => (
          <button
            key={group}
            onClick={() => setFilters((f) => ({ ...f, target: group }))}
            style={{
              ...buttonBase,
              ...(filters.target === group ? buttonActive : {}),
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(90deg, #7c3aed 0%, #c026d3 100%)'}
            onMouseLeave={e => e.currentTarget.style.background = filters.target === group ? 'linear-gradient(90deg, #8b5cf6 0%, #d946ef 100%)' : 'linear-gradient(90deg, #312e81 0%, #4c1d95 100%)'}
          >
            {group}
          </button>
        ))}
      </div>
      <div>
        <span style={groupTitle}>Trainingsart:</span>
        {trainingTypes.map((type) => (
          <button
            key={type}
            onClick={() => setFilters((f) => ({ ...f, type }))}
            style={{
              ...buttonBase,
              ...(filters.type === type ? buttonActive : {}),
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(90deg, #7c3aed 0%, #c026d3 100%)'}
            onMouseLeave={e => e.currentTarget.style.background = filters.type === type ? 'linear-gradient(90deg, #8b5cf6 0%, #d946ef 100%)' : 'linear-gradient(90deg, #312e81 0%, #4c1d95 100%)'}
          >
            {type}
          </button>
        ))}
      </div>
      <div>
        <span style={groupTitle}>Equipment:</span>
        {equipmentTypes.map((eq) => (
          <button
            key={eq}
            onClick={() => setFilters((f) => ({ ...f, equipment: eq }))}
            style={{
              ...buttonBase,
              ...(filters.equipment === eq ? buttonActive : {}),
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(90deg, #7c3aed 0%, #c026d3 100%)'}
            onMouseLeave={e => e.currentTarget.style.background = filters.equipment === eq ? 'linear-gradient(90deg, #8b5cf6 0%, #d946ef 100%)' : 'linear-gradient(90deg, #312e81 0%, #4c1d95 100%)'}
          >
            {eq}
          </button>
        ))}
      </div>
      <div>
        <span style={groupTitle}>Level:</span>
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => setFilters((f) => ({ ...f, level }))}
            style={{
              ...buttonBase,
              ...(filters.level === level ? buttonActive : {}),
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(90deg, #7c3aed 0%, #c026d3 100%)'}
            onMouseLeave={e => e.currentTarget.style.background = filters.level === level ? 'linear-gradient(90deg, #8b5cf6 0%, #d946ef 100%)' : 'linear-gradient(90deg, #312e81 0%, #4c1d95 100%)'}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
} 