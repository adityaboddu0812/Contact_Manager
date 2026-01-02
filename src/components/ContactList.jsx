import React, { useState, useMemo } from 'react';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const ContactList = ({ contacts, onContactDeleted }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [sortBy, setSortBy] = useState('date-newest');

  const handleDeleteClick = (id, name) => {
    setContactToDelete({ id, name });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!contactToDelete) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts/${contactToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }

      if (onContactDeleted) {
        onContactDeleted(contactToDelete.id);
      }

      setDeleteDialogOpen(false);
      setContactToDelete(null);
    } catch (error) {
      console.error('Delete failed:', error);
      setDeleteDialogOpen(false);
      setContactToDelete(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const sortedContacts = useMemo(() => {
    const contactsCopy = [...contacts];
    
    switch (sortBy) {
      case 'name-asc':
        return contactsCopy.sort((a, b) => 
          a.name.localeCompare(b.name)
        );
      case 'name-desc':
        return contactsCopy.sort((a, b) => 
          b.name.localeCompare(a.name)
        );
      case 'date-newest':
        return contactsCopy.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
      case 'date-oldest':
        return contactsCopy.sort((a, b) => 
          new Date(a.createdAt) - new Date(b.createdAt)
        );
      default:
        return contactsCopy;
    }
  }, [contacts, sortBy]);

  if (contacts.length === 0) {
    return (
      <div className="bg-card rounded-lg p-6 card-shadow">
        <h2 className="text-xl font-semibold text-foreground mb-4">Contacts</h2>
        <p className="text-muted-foreground text-center py-8">
          No contacts yet. Add your first contact above.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-card rounded-lg p-6 card-shadow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            Contacts ({contacts.length})
          </h2>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label htmlFor="sort-select" className="text-sm text-muted-foreground whitespace-nowrap">
              Sort by:
            </label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sort-select" className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort contacts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-newest">Date (Newest First)</SelectItem>
                <SelectItem value="date-oldest">Date (Oldest First)</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Phone</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Message</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Created</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedContacts.map((contact) => (
                <tr key={contact.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4 text-sm text-foreground font-medium">{contact.name}</td>
                  <td className="py-3 px-4 text-sm text-foreground">{contact.email || '-'}</td>
                  <td className="py-3 px-4 text-sm text-foreground">{contact.phone}</td>
                  <td className="py-3 px-4 text-sm text-foreground max-w-xs truncate">{contact.message || '-'}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{formatDate(contact.createdAt)}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDeleteClick(contact.id, contact.name)}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-md hover:bg-destructive/10"
                      aria-label="Delete contact"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {sortedContacts.map((contact) => (
            <div key={contact.id} className="p-4 rounded-lg bg-muted/30 border border-border">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-foreground">{contact.name}</h3>
                <button
                  onClick={() => handleDeleteClick(contact.id, contact.name)}
                  className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded-md hover:bg-destructive/10"
                  aria-label="Delete contact"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="space-y-1 text-sm">
                {contact.email && (
                  <p className="text-foreground">
                    <span className="text-muted-foreground">Email:</span> {contact.email}
                  </p>
                )}
                <p className="text-foreground">
                  <span className="text-muted-foreground">Phone:</span> {contact.phone}
                </p>
                {contact.message && (
                  <p className="text-foreground">
                    <span className="text-muted-foreground">Message:</span> {contact.message}
                  </p>
                )}
                <p className="text-muted-foreground text-xs mt-2">
                  {formatDate(contact.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contact</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{contactToDelete?.name}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ContactList;
