import express from "express";
import {
    createUserProperty,
    getAllUserProperties,
    updateUserProperty,
    deleteUserProperty
} from "../controllers/userProperty.controller.js";

const router = express.Router();

router.post("/", createUserProperty);
router.get("/", getAllUserProperties);
router.put("/:id", updateUserProperty);
router.delete("/:id", deleteUserProperty);

export default router;
