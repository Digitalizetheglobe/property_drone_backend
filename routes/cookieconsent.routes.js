import express from "express";
import {
  setCookieConsent,
  getCookieConsent,
} from "../controllers/cookieconsent.controller.js";

const router = express.Router();

router.post("/", setCookieConsent); // set or update consent
router.get("/", getCookieConsent);  // get consent

export default router;

