import React from "react";
import "./PatientModal.css";

function PatientModal({ patient, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{patient.name}</h2>
        <p>Email: {patient.email}</p>
        <p>Phone: {patient.phone}</p>
        <p>Username: {patient.username}</p>
        <p>Website: {patient.website}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default PatientModal;
