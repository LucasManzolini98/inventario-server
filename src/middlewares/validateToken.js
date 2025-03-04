require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY; // Asegúrate de definir esta variable en el .env

const validateToken = (req, res, next) => {
    const header = req.headers["authorization"];
    //No token
    if (!header) {
        return res.status(403).json({ error: "No Token" }); 
    }

    const bearer = header.split(" ");
    const token = bearer[1];

    try {
        const decoded = jwt.verify(token, secretKey);
        //Ok
        req.user = decoded; // Guarda los datos decodificados en `req.user`
        next(); // Llama a la siguiente función del middleware (ejecuta la ruta)
    } catch (err) {
        return res.status(403).json({ error: "Token inválido o expirado" });  // Si el token es inválido o expirado, retorna 403
    }
};

module.exports = validateToken;
