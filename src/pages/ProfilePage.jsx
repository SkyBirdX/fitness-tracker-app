import React, { useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: ""
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2.5rem 1rem" }}>
      {}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 36 }}>
        <div style={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #8b5cf6 60%, #d946ef 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 48,
          color: "#fff",
          marginBottom: 12,
          boxShadow: "0 4px 24px rgba(139,92,246,0.15)"
        }}>
          👤
        </div>
        <h1 style={{ color: "#c4b5fd", fontWeight: 800, fontSize: 32, margin: 0 }}>Profil</h1>
        <div style={{ color: "#a78bfa", fontSize: 16, marginTop: 4 }}>Deine Körperdaten</div>
      </div>
      {}
      <div style={{
        display: "flex",
        flexWrap: "nowrap",
        gap: 36,
        alignItems: "stretch",
        justifyContent: "flex-start"
      }}>
        {}
        <div style={{ flex: "1 1 420px", minWidth: 320, maxWidth: 420, display: "flex", alignItems: "stretch" }}>
          <form onSubmit={handleSave} style={{
            background: "rgba(17,24,39,0.7)",
            borderRadius: 10,
            padding: 28,
            width: "100%",
            boxShadow: "0 2px 12px rgba(139,92,246,0.10)",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            height: "100%",
            fontSize: 20
          }}>
            <input
              name="name"
              placeholder="Name (optional)"
              value={profile.name}
              onChange={handleChange}
            />
            <input
              name="age"
              type="number"
              placeholder="Alter (Jahre)"
              value={profile.age}
              onChange={handleChange}
            />
            <select name="gender" value={profile.gender} onChange={handleChange}>
              <option value="">Geschlecht wählen</option>
              <option value="männlich">Männlich</option>
              <option value="weiblich">Weiblich</option>
            </select>
            <input
              name="height"
              type="number"
              placeholder="Größe (cm)"
              value={profile.height}
              onChange={handleChange}
            />
            <input
              name="weight"
              type="number"
              placeholder="Gewicht (kg)"
              value={profile.weight}
              onChange={handleChange}
            />
            <button type="submit" style={{
              width: "100%",
              padding: "12px 0",
              background: "linear-gradient(90deg, #8b5cf6 0%, #d946ef 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 17,
              marginTop: 8,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
              transition: "all 0.2s"
            }}>Speichern</button>
            {saved && <div style={{ color: "#22c55e", fontWeight: 600, marginTop: 6 }}>Profil gespeichert!</div>}
          </form>
        </div>
        {}
        <div style={{ flex: "1 1 420px", minWidth: 320, maxWidth: 420, display: "flex", alignItems: "stretch" }}>
          <div style={{
            background: "#1e1b4b",
            borderRadius: 10,
            padding: 28,
            color: "#fff",
            boxShadow: "0 2px 12px rgba(139,92,246,0.10)",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            fontSize: 22
          }}>
            <h3 style={{ color: "#a78bfa", marginTop: 0, marginBottom: 10, fontWeight: 700, fontSize: 26 }}>Deine Angaben</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 22, lineHeight: 2.1 }}>
              <li><span style={{ marginRight: 10 }}>👤</span><strong>Name:</strong> <span style={{ color: '#c4b5fd' }}>{profile.name || "beispiel"}</span></li>
              <li><span style={{ marginRight: 10 }}>🎂</span><strong>Alter:</strong> <span style={{ color: '#c4b5fd' }}>{profile.age || "18"}</span></li>
              <li><span style={{ marginRight: 10 }}>⚥</span><strong>Geschlecht:</strong> <span style={{ color: '#c4b5fd' }}>{profile.gender || "männlich"}</span></li>
              <li><span style={{ marginRight: 10 }}>📏</span><strong>Größe:</strong> <span style={{ color: '#c4b5fd' }}>{profile.height ? profile.height + " cm" : "180 cm"}</span></li>
              <li><span style={{ marginRight: 10 }}>⚖️</span><strong>Gewicht:</strong> <span style={{ color: '#c4b5fd' }}>{profile.weight ? profile.weight + " kg" : "70 kg"}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 