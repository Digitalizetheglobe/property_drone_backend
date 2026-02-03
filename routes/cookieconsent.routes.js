import express from "express";
import {
  setCookieConsent,
  getCookieConsent,
  getAllCookieConsents,
} from "../controllers/cookieconsent.controller.js";

const router = express.Router();

router.get("/all", getAllCookieConsents); // get all consents
router.post("/", setCookieConsent); // set or update consent
router.get("/", getCookieConsent);  // get consent

export default router;

