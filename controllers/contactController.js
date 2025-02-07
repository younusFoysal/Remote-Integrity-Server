import Contact from '../models/Contact.js';
import res from "express/lib/response.js";

// Get all contacts
export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single contact by ID
export const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new contact
export const createContact = async (req, res) => {
    try {
        const { contact_name, contact_email, contact_phone, contact_type, company_id, notes } = req.body;

        const newContact = new Contact({
            contact_name,
            contact_email,
            contact_phone,
            contact_type,
            company_id,
            notes
        });

        await newContact.save();
        res.status(201).json(newContact);

    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
};


// Update an existing contact
export const updateContact = async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(updatedContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a contact
export const deleteContact = async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ message: 'Contact deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



