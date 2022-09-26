const express = require('express')
const jwt = require("jsonwebtoken");
const router = express.Router()
const pool = require('../postgresql').pool

router.post('/', (req, res, next) => {
    if(req.body.usuario === 'Tales' && req.body.senha === '123'){
        const id = 1
        const token = jwt.sign({id}, process.env.SECRET, {expiresIn: 300})
        return res.json({auth: true, token: token})
    }
    res.status(500).json({mensagem: 'Login inválido!'})
})

module.exports = router