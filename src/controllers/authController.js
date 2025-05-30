const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Importamos el modelo MySQL
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("trying to login..." + email + "..." + password);
  try {
    const user = await User.getUserByEmail(email);
    if (!user) return res.status(400).json({ msg: "Usuario no encontrado" });

    const validPassword = await User.verifyPassword(password, user.password);
    if (!validPassword)
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    const token = jwt.sign(
      { id: user.id, role: user.rol },
      secretKey,
      { expiresIn: "20m" }
    );
    console.log("-----token generado-----");
    res.json({ token });
  } catch (error) {

    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const register = async (req, res) => {
  const { email, password, role = "empleado" } = req.body;

  try {
    // Revisar si el usuario ya existe
    const existingUser = await User.getUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ msg: "El usuario ya existe" });

    // Crear usuario 
    const userId = await User.addUser(email, password, role);
    res.status(201).json({ msg: "Usuario creado", userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const validateToken = (req, res) => {
  const header = req.headers["authorization"];
  console.log("validando token.....")
  //No token
  if (!header) {
    return res.status(400).json({ error: "No Token" });
  }

  const bearer = header.split(" ");
  const token = bearer[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    //Ok
    req.user = decoded; // Guarda los datos decodificados en `req.user`
    res.status(200).json({ "message": "valid" })
  } catch (err) {
    return res.status(403).json({ error: "Token inválido o expirado" });  // Si el token es inválido o expirado, retorna 403
  }
};

const loginWithToken = async (req, res) => {

  console.log("trying to login only with token...")
  const header = req.headers["authorization"];

  //No token
  if (!header) {
    return res.status(400).json({ error: "No Token" });
  }

  const bearer = header.split(" ");
  const token = bearer[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    res.status(200).json({ credentials: decoded })
  } catch (err) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};






module.exports = { login, register, validateToken, loginWithToken };
