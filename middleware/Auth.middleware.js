import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.header.authorization;
  if (!authHeader) {
    return res.status(401).json({
      status: 401,
      success: false,
      message: "Access denied. No token provided",
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Invalid token",
    });
  }
};

export default authMiddleware;
