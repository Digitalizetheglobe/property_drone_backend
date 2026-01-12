// Model for storing cookie consent status by user or anonymous id (by IP/session)
import { DataTypes } from "sequelize";

export default (sequelize) => {
  const CookieConsent = sequelize.define("CookieConsent", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // If not logged in, track by session or IP (basic example)
    clientIdentifier: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    consent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  });
  return CookieConsent;
};

