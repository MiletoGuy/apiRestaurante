const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]

    if (!token) {
        return res.status(403).send({
            mensagem: "Token não encontrado!"
        })
    }

    jwt.verify(token, config.secret, (error, decoded) => {
        if (error) {
            return res.status(401).send({
                mensagem: "Não autorizado!"
            })
        }
        next()
    })
}

const authJwt = {
    verifyToken: verifyToken
}

module.exports = authJwt