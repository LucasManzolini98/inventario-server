const pool = require("../src/config/db");
const bcrypt = require("bcryptjs");

const createAdminUser = async () => {
    const email = "admin@email.com";
    const password = "admin";
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const [result] = await pool.query(
            "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
            [email, hashedPassword, "admin"]
        );
        console.log("Usuario administrador creado con éxito.");
    } catch (error) {
        console.error("Error creando el usuario admin:", error);
    }
};

createAdminUser();
