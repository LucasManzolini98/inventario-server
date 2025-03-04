const express = require("express");
const { login, register, validateToken } = require("../controllers/authController");

const router = express.Router();

// Ruta para login
router.post("/login", login);

// Ruta para registrar un usuario
router.post("/register", register);
router.post("/validate-token",validateToken);

module.exports = router;
