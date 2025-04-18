import { Contact } from "../models/index.js";

// Get all contact messages
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new contact message
export const createContact = async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;
    const contact = await Contact.create({ name, email, mobile, message });
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
