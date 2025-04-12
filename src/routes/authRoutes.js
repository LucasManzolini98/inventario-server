const express = require("express");
const { login, register, validateToken, loginWithToken } = require("../controllers/authController");

const router = express.Router();

// Ruta para login
router.post("/login", login);
router.post("/login-with-token", loginWithToken);

// Ruta para registrar un usuario
router.post("/register", register);

// Validar token
router.post("/validate-token",validateToken);

module.exports = router;
