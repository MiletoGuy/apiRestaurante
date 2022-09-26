const express = require('express')
const jwt = require("jsonwebtoken");
const router = express.Router()
const pool = require('../postgresql').pool

router.post('/', (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        const usuario = req.body.usuario
        pool.query('SELECT * FROM usuario WHERE usuario = $1', [usuario], (error, result) => {
            if (error) {
                console.log("erro")
                reject("Ocorreu um erro!", error)
            } else {
                console.log("ok")
                resolve(result)
            }
        })
    })


    promise.then(result => {
        console.log(result)
        if (!result.rows[0]) return res.json({auth: false, mensagem: 'Usuario no encontrado'})

        const usuario = result.rows[0].usuario
        const senha = result.rows[0].senha


        if (req.body.usuario === usuario && req.body.senha === senha) {
            const id = 1
            const token = jwt.sign({id}, process.env.SECRET, {expiresIn: 3000})
            return res.json({auth: true, token: token})
        }
        res.status(500).json({auth:false,mensagem: 'Login inválido!'})
    })
})

module.exports = router