import React from "react";
import "./PatientCard.css";

function PatientCard({ patient, onView }) {
  return (
    <div className="card">
      <h3>{patient.name}</h3>
      <p>Age: {20 + (patient.id % 10)}</p>
      <p>Contact: {patient.phone}</p>
      <button onClick={() => onView(patient)}>View Details</button>
    </div>
  );
}

export default PatientCard;
