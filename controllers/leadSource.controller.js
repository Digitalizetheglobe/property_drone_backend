import { LeadSource } from "../models/index.js";

export const createLeadSource = async (req, res) => {
  try {
    const { source, phoneNumber } = req.body;
    if (!source) {
      return res.status(400).json({ error: "Source is required" });
    }
    const newLead = await LeadSource.create({ source, phoneNumber });
    res.status(201).json({ message: "Lead source saved successfully", data: newLead });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

export const getLeadSources = async (req, res) => {
  try {
    const leads = await LeadSource.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({ data: leads });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};
