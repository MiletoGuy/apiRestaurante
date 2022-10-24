const express = require('express')
const jwt = require("jsonwebtoken");
const router = express.Router()
const pool = require('../postgresql').pool

router.post('/', (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        const usuario = req.body.usuario
        const senha = req.body.senha
        pool.query('SELECT * FROM usuario WHERE usuario = $1 AND senha = crypt($2,senha)', [usuario, senha], (error, result) => {
            if (error) {
                console.log("erro de query")
                reject(error)
            } else {
                resolve(result)
            }
        })
    })

    promise.then(result => {
        if (!result.rows[0]) return res.json({auth: false, mensagem: 'Login Inválido'})
        const id = result.rows[0].id
        const token = jwt.sign({id}, process.env.SECRET, {expiresIn: 3000})
        return res.json({auth: true, token: token, userId: id})
    })
})

module.exports = router