'use client';

import React, { useState } from 'react';
import AcademicForm from './AcademicForm';
import SocialForm from './SocialForm';
import AchievementsForm from './AchievementsForm';
import { useRouter } from 'next/navigation';
import './App.css'

const FormContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    university: '',
    degree: '',
    year: '',
    twitter: '',
    linkedin: '',
    github: '',
    achievements: '',
  });
  
  
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleFormChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Save form data in local storage
    localStorage.setItem('formData', JSON.stringify(formData));
    alert('Form submitted!');
  };

  
  return (
        <div>
      {currentPage === 1 && (
        <AcademicForm
          formData={formData}
          onNext={handleNext}
          onFormChange={handleFormChange}
        />
      )}
      {currentPage === 2 && (
        <SocialForm
          formData={formData}
          onPrev={handlePrev}
          onNext={handleNext}
          onFormChange={handleFormChange}
        />
      )}
      {currentPage === 3 && (
        <AchievementsForm
          formData={formData}
          onPrev={handlePrev}
          onSubmit={handleSubmit}
          onFormChange={handleFormChange}
        />
      )}
    </div>
  );
};

export default FormContainer;
