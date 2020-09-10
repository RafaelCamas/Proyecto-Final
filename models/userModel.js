const SQL = require('sql-template-strings');
const bcrypt = require('bcrypt');
const utils = require('../utils/index');

module.exports = {
    addUser: async (infoUser) => {
        const {
            nombre_apellidos,
            correo,
            telefono,
            nombre_usuario,
            password
        } = infoUser;

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const query = SQL `INSERT INTO users(nombre_apellidos, correo, telefono, nombre_usuario, password) VALUES (${nombre_apellidos}, ${correo}, ${telefono}, ${nombre_usuario}, ${encryptedPassword});`;

        return await utils.executeQuery(query);
    },
    checkUser: async (nombre_usuario) => {
        const query = SQL `SELECT id, password, nombre_usuario FROM users WHERE nombre_usuario = ${nombre_usuario};`;

        return await utils.executeQuery(query);
    },
    getUserInfo: async (userId) => {
        const query = SQL `SELECT nombre_apellidos, correo, telefono FROM users WHERE id = ${userId}`;

        return await utils.executeQuery(query);
    }
}