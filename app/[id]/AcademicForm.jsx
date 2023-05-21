"use client";
import React, { useState } from 'react';

const AcademicForm = ({ onNext, onFormChange, formData }) => {
  const [university, setUniversity] = useState(formData.university);
  const [degree, setDegree] = useState(formData.degree);
  const [year, setYear] = useState(formData.year);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormChange('university', university);
    onFormChange('degree', degree);
    onFormChange('year', year);
    onNext();
  };

  return (
    <div className="form-container">
      <h1>Academic Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="university">University:</label>
          <input
            type="text"
            id="university"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="degree">Degree:</label>
          <input
            type="text"
            id="degree"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <input
            type="text"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
};

export default AcademicForm;
