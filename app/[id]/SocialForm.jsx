"use client";
import React, { useState } from 'react';

const SocialForm = ({ onPrev, onNext, onFormChange, formData }) => {
  const [twitter, setTwitter] = useState(formData.twitter);
  const [linkedin, setLinkedin] = useState(formData.linkedin);
  const [github, setGithub] = useState(formData.github);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormChange('twitter', twitter);
    onFormChange('linkedin', linkedin);
    onFormChange('github', github);
    onNext();
  };

  return (
    <div className="form-container">
      <h1>Social Profiles</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="twitter">Twitter:</label>
          <input
            type="text"
            id="twitter"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="linkedin">LinkedIn:</label>
          <input
            type="text"
            id="linkedin"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="github">GitHub:</label>
          <input
            type="text"
            id="github"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="button" onClick={onPrev}>Previous</button>
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
};

export default SocialForm;
