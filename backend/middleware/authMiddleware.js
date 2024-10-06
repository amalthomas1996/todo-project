
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //console.log("Token received:", token); // Log the token for debugging

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //console.log("Decoded user ID:", decoded.id); // Log the decoded ID

      // Get the user from the token
      req.user = await User.findById(decoded.id).select("-password");
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error("Authorization error:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};


module.exports = { protect };
