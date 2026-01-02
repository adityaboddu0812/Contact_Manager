import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// GET /api/contacts - Get all contacts (newest first)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    // Convert _id to id for frontend compatibility
    const formattedContacts = contacts.map(contact => ({
      id: contact._id.toString(),
      name: contact.name,
      phone: contact.phone,
      email: contact.email || '',
      message: contact.message || '',
      createdAt: contact.createdAt
    }));

    res.json(formattedContacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// POST /api/contacts - Create a new contact
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    // Basic validation
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({ error: 'Phone is required' });
    }

    // Create contact
    const contact = new Contact({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      message: message ? message.trim() : ''
    });

    const savedContact = await contact.save();

    // Format response for frontend
    const formattedContact = {
      id: savedContact._id.toString(),
      name: savedContact.name,
      phone: savedContact.phone,
      email: savedContact.email || '',
      message: savedContact.message || '',
      createdAt: savedContact.createdAt
    };

    res.status(201).json(formattedContact);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

// DELETE /api/contacts/:id - Delete a contact
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Contact ID is required' });
    }

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

export default router;
