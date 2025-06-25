import React, { useState } from "react";

export default function ExerciseCard({ exercise }) {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div style={{
      border: "1.5px solid #4b5563",
      borderRadius: "18px",
      padding: "1.2rem 1rem 1.5rem 1rem",
      width: "320px",
      boxShadow: "0 4px 24px rgba(124,58,237,0.10)",
      margin: "0.5rem",
      background: "linear-gradient(135deg, #1e1b4b 60%, #4c1d95 100%)",
      color: "#e5e7eb",
      transition: "transform 0.15s, box-shadow 0.15s",
      xsition: "relative",
      overflow: "hidden"
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'none'}
    >
      <h3 style={{ color: "#c4b5fd", marginBottom: 8 }}>💪 {exercise.name}</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: 8 }}>
        <span style={{ background: "#312e81", color: "#a78bfa", borderRadius: 8, padding: "2px 10px", fontSize: 13 }}>
          {exercise.target}
        </span>
        <span style={{ background: "#312e81", color: "#f472b6", borderRadius: 8, padding: "2px 10px", fontSize: 13 }}>
          {exercise.equipment}
        </span>
        <span style={{ background: "#312e81", color: "#facc15", borderRadius: 8, padding: "2px 10px", fontSize: 13 }}>
          {exercise.level}
        </span>
      </div>
      {exercise.videoUrl && (
        <div style={{ margin: "1rem 0", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 12px rgba(139,92,246,0.15)" }}>
          <iframe
            width="100%"
            height="180"
            src={exercise.videoUrl}
            title={exercise.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: "none" }}
          ></iframe>
        </div>
      )}
      <button
        onClick={() => setShowInstructions((v) => !v)}
        style={{
          width: "100%",
          padding: "10px 0",
          background: "linear-gradient(90deg, #8b5cf6 0%, #d946ef 100%)",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          marginBottom: 8,
          cursor: "pointer",
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          transition: "all 0.2s"
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(90deg, #7c3aed 0%, #c026d3 100%)'}
        onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(90deg, #8b5cf6 0%, #d946ef 100%)'}
      >
        {showInstructions ? "Anleitung verbergen" : "Anleitung lesen"}
      </button>
      {showInstructions && (
        <ul style={{ textAlign: "left", margin: 0, paddingLeft: 18, color: "#f3e8ff" }}>
          {exercise.instructions.map((step, idx) => (
            <li key={idx} style={{ marginBottom: 4 }}>{step}</li>
          ))}
        </ul>
      )}
    </div>
  );
}