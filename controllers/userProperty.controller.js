import { UserProperty } from "../models/index.js";

// Create a new property submission
export const createUserProperty = async (req, res) => {
    try {
        console.log("Creating User Property:", req.body);
        const {
            userName,
            city,
            propertyCategory,
            propertyType,
            buildingName,
            locality,
            bhk,
            area,
            areaUnit,
            furnishing,
            shareWithAgents
        } = req.body;

        const newProperty = await UserProperty.create({
            userName,
            city,
            propertyCategory,
            propertyType,
            buildingName,
            locality,
            bhk,
            area,
            areaUnit,
            furnishing,
            shareWithAgents
        });

        res.status(201).json(newProperty);
    } catch (error) {
        console.error("Error creating user property:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get all user submitted properties
export const getAllUserProperties = async (req, res) => {
    try {
        const properties = await UserProperty.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json(properties);
    } catch (error) {
        console.error("Error fetching user properties:", error);
        res.status(500).json({ message: error.message });
    }
};

// Update status or details
export const updateUserProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await UserProperty.update(req.body, {
            where: { id }
        });

        if (updated) {
            const updatedProperty = await UserProperty.findByPk(id);
            res.status(200).json(updatedProperty);
        } else {
            res.status(404).json({ message: "Property not found" });
        }
    } catch (error) {
        console.error("Error updating user property:", error);
        res.status(500).json({ message: error.message });
    }
};

// Delete
export const deleteUserProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await UserProperty.destroy({
            where: { id }
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Property not found" });
        }
    } catch (error) {
        console.error("Error deleting user property:", error);
        res.status(500).json({ message: error.message });
    }
};
