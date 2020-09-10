const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

module.exports = {
    addUser: async function (req, res) {
        const user = req.body;
        const result = await userModel.addUser(user);
        res.status(200).json({
            message: "Usuario añadido correctamente",
            idUser: result.insertId
        });

    },
    userLogin: async function (req, res) {
        try {
            const {
                nombre_usuario,
                password
            } = req.body;
            const userInfo = await userModel.checkUser(nombre_usuario);
            console.log(userInfo);
            if (!userInfo[0]) {
                res.status(401).json({
                    message: "Usuario o contraseña incorrectos"
                });
                return;
            }
            const correctPassword = await bcrypt.compare(password, userInfo[0].password);
            if (!correctPassword) {
                res.status(401).json({
                    message: "Usuario o contraseña incorrectos"
                });
            }
            const token = jwt.sign({
                    nombre_usuario
                },
                process.env.SECRET, {
                    expiresIn: 60 * 60 * 48
                });
            res.status(200).json({
                message: "Login completado con éxito",
                token,
                nombre_usuario
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Un error ha ocurrido, por favor vuelve a intentarlo')
        }
    }
}