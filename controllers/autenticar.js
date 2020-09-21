const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers["x-acces-token"];
    if (!token) {
        res.status(401).json({
            message: "Introduce un token válido por favor"
        });
        return;
    }
    const decodedToken = jwt.verify(token, process.env.SECRET);
    req.nombre_usuario = decodedToken.nombre_usuario;
    next();
}