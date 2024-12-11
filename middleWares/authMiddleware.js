
export const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  try {
    const payload = verifyAccessToken(token); 
    req.user = payload;
    next();
  } catch (error) {
    res.status(403).json({ error: "Token inválido o expirado" });
  }
};
