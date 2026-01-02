import React, { useState } from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const ContactForm = ({ onContactAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email) => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      return false;
    }
    if (formData.email && !validateEmail(formData.email)) {
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact');
      }

      const newContact = await response.json();
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      setSuccessMessage('Contact added successfully!');
      
      if (onContactAdded) {
        onContactAdded(newContact);
      }

      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);

    } catch (error) {
      setErrors({ submit: 'Failed to submit contact. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 card-shadow">
      <h2 className="text-xl font-semibold text-foreground mb-6">Add New Contact</h2>
      
      {successMessage && (
        <div className="mb-4 p-3 rounded-md bg-success text-success-foreground text-sm">
          {successMessage}
        </div>
      )}

      {errors.submit && (
        <div className="mb-4 p-3 rounded-md bg-destructive text-destructive-foreground text-sm">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <InputField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
          placeholder="Enter full name"
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
          placeholder="Enter email address"
        />

        <InputField
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          required
          placeholder="Enter phone number"
        />

        <TextAreaField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter a message (optional)"
          rows={3}
        />

        <button
          type="submit"
          disabled={!isFormValid() || isSubmitting}
          className="w-full mt-2 px-4 py-2.5 rounded-md bg-primary text-primary-foreground font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Add Contact'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
