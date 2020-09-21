const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('../models/UserModelMongo');

mongoose.connect(`mongodb+srv://${process.env.MONGOATLAS_USER}:${process.env.MONGOATLAS_PASS}@servidor1.qpyev.azure.mongodb.net/bands?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = {

    addUser: async function (req, res) {
        try {
            const user = req.body;
            const toAddUser = new User();
            toAddUser.name = user.name;
            toAddUser.correo = user.correo;
            toAddUser.telefono = user.telefono;
            toAddUser.userName = user.userName;
            toAddUser.fotoPerfil = user.fotoPerfil;

            const salt = await bcrypt.genSalt(10);
            toAddUser.password = await bcrypt.hash(user.password, salt);

            toAddUser.save((err, userSaved) => {
                if (err) throw new Error('Error al añadir el usuario', err)
                res.status(200).json({
                    message: 'Usuario añadido con éxito',
                    user: userSaved
                })
            })
        } catch (error) {
            res.status(500).send('Se ha producido un error al añadir el usuario')
        }
    },
    userLogin: async function (req, res) {
        try {
            const {
                userName,
                password
            } = req.body;
            const userInfo = await User.find({
                userName: userName
            });
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
                return;
            }
            const token = jwt.sign({
                    userName
                },
                process.env.SECRET, {
                    expiresIn: 60 * 60 * 48
                });
            res.status(200).json({
                message: "Login completado con éxito",
                token,
                userName
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Un error ha ocurrido, por favor vuelve a intentarlo')
        }
    }
}