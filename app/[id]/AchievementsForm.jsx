"use client";
import React, { useState } from 'react';

const AchievementsForm = ({ onPrev, onSubmit, onFormChange, formData }) => {
  const [achievements, setAchievements] = useState(formData.achievements);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(achievements);
    onFormChange('achievements', achievements);
    onSubmit();
  };
  

  return (
    <div className="form-container">
      <h1>Career Achievements</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="achievements">Achievements:</label>
          <textarea
            id="achievements"
            value={achievements}
            onChange={(e) => setAchievements(e.target.value)}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="button" onClick={onPrev}>Previous</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AchievementsForm;
