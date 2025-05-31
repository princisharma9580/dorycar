// routes/adminAuth.js or controllers/adminAuth.js

const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
};

module.exports = { loginAdmin };
