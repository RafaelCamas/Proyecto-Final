const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers["x-acces-token"];
    if (!token) {
        res.status(401).json({
            message: "Introduce un token válido por favor"
        });
        const decodedToken = jwt.verify(token, process.env.SECRET);
        req.usuario_nombre = decodedToken.usuario_nombre;
        next();
    }
}