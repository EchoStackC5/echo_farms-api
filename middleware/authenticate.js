import jwt from "jsonwebtoken";
import { secret } from "../config/env.js";
import { roles } from "../utils/roles.js";

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.replace("Bearer ", "").trim();
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error: error.message });
  }
};

export const hasPermission = (permission) => {
  return (req, res, next) => {
    const role = req.user?.role;
    const userRole = roles.find((r) => r.role === role);

    if (userRole && userRole.permissions.includes(permission)) {
      return next();
    }
    return res.status(403).json({ error: "Not authorized" });
  };
};
