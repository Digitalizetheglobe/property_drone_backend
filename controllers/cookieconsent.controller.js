import { CookieConsent } from "../models/index.js";

// Set or update cookie consent status
export const setCookieConsent = async (req, res) => {
  try {
    const { consent, userId, clientIdentifier } = req.body;
    if (typeof consent === 'undefined') {
      return res.status(400).json({ message: "Consent value missing" });
    }

    // Use either userId or clientIdentifier for lookup
    let where = userId ? { userId } : { clientIdentifier };
    let [cookieEntry, created] = await CookieConsent.findOrCreate({
      where,
      defaults: { consent, userId, clientIdentifier },
    });
    if (!created) {
      cookieEntry.consent = consent;
      await cookieEntry.save();
    }
    res.status(200).json({ consent: cookieEntry.consent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get cookie consent status
export const getCookieConsent = async (req, res) => {
  try {
    const { userId, clientIdentifier } = req.query;
    if (!userId && !clientIdentifier) {
      return res.status(400).json({ message: "userId or clientIdentifier required" });
    }
    let where = userId ? { userId } : { clientIdentifier };
    const entry = await CookieConsent.findOne({ where });
    res.status(200).json({ consent: entry ? entry.consent : null });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

