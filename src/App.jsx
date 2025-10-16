import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import PatientCard from "./components/PatientCard.jsx";
import PatientModal from "./components/PatientModal.jsx";
import "./App.css";

function App() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Add new patient state
  const [showForm, setShowForm] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: "", phone: "" });

  // Fetch patients data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setPatients(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <Navbar />

      <div className="search-container">
        <input
          type="text"
          placeholder="Search patient by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Add New Patient Button */}
      <div style={{ margin: "20px 0" }}>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: "8px 12px",
            backgroundColor: "#0078d7",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {showForm ? "Cancel" : "Add New Patient"}
        </button>
      </div>

      {/* Add New Patient Form */}
      {showForm && (
        <div
          style={{
            margin: "20px 0",
            textAlign: "left",
            maxWidth: "300px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <input
            type="text"
            placeholder="Name"
            value={newPatient.name}
            onChange={(e) =>
              setNewPatient({ ...newPatient, name: e.target.value })
            }
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <input
            type="text"
            placeholder="Phone"
            value={newPatient.phone}
            onChange={(e) =>
              setNewPatient({ ...newPatient, phone: e.target.value })
            }
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <button
            onClick={() => {
              if (newPatient.name && newPatient.phone) {
                const id = patients.length + 1;
                setPatients([...patients, { id, ...newPatient }]);
                setNewPatient({ name: "", phone: "" });
                setShowForm(false);
              }
            }}
            style={{
              padding: "8px 12px",
              backgroundColor: "#0078d7",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add Patient
          </button>
        </div>
      )}

      {loading && <p className="loading">Loading patients...</p>}
      {error && <p className="error">Failed to load patients!</p>}

      <div className="patient-grid">
        {filteredPatients.map((p) => (
          <PatientCard key={p.id} patient={p} onView={setSelectedPatient} />
        ))}
      </div>

      {selectedPatient && (
        <PatientModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
}

export default App;
