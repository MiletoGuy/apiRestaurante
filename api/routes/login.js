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
                reject("Ocorreu um erro!", error)
            } else {
                console.log("ok")
                resolve(result)
            }
        })
    })


    promise.then(result => {
        if (!result.rows[0]) return res.json({auth: false, mensagem: 'Usuario não encontrado'})
        const id = 1
        const token = jwt.sign({id}, process.env.SECRET, {expiresIn: 3000})
        return res.json({auth: true, token: token})
    })
})

module.exports = router