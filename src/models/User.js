const pool = require("../config/db");
const bcrypt = require("bcryptjs");

// Obtener usuario por email
const getUserByEmail = async (email) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    console.log(rows);
    return rows[0];
};

// Crear un nuevo usuario
const addUser = async (email, password, role = "empleado") => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
        "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
        [email, hashedPassword, role]
    );
    return result.insertId;
};

// Verificar contraseña
const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = { getUserByEmail, addUser, verifyPassword };
