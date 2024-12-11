import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "../config/config.js";

export const generateAccessToken = (payload) => {
    return jwt.sign(payload, JWT_TOKEN, { expiresIn: "24h" });
  };