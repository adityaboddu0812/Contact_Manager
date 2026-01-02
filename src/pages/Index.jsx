import React, { useState, useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const Index = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }

      const data = await response.json();
      // Sort by createdAt descending (newest first)
      const sortedContacts = data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setContacts(sortedContacts);
    } catch (err) {
      setError('Failed to load contacts. Please make sure the API server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactAdded = (newContact) => {
    setContacts(prev => [newContact, ...prev]);
  };

  const handleContactDeleted = (id) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Contact Manager
          </h1>
          <p className="text-muted-foreground">
            Manage your contacts in one place
          </p>
        </header>

        <div className="space-y-6">
          <ContactForm onContactAdded={handleContactAdded} />

          {isLoading ? (
            <div className="bg-card rounded-lg p-6 card-shadow">
              <p className="text-muted-foreground text-center py-8">
                Loading contacts...
              </p>
            </div>
          ) : error ? (
            <div className="bg-card rounded-lg p-6 card-shadow">
              <p className="text-destructive text-center py-8">
                {error}
              </p>
            </div>
          ) : (
            <ContactList 
              contacts={contacts} 
              onContactDeleted={handleContactDeleted} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
