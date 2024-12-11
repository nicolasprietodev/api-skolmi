import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "../config/config.js";

export const authenticationToken = (req, res, next) => {
  const token = req.cookies.authToken

  if (!token) return res.status(401).json({ message: 'No tiene autorizacion' })

  jwt.verify(token, JWT_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}
