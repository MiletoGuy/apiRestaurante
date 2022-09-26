// const jwt = require('jsonwebtoken')
// function verifyJWT(req, res, next) {
//     const token = req.headers['x-access-token']
//     if (!token) return res.status(401).send({auth: false, mensagem: 'Token não encontrado'})
//
//     jwt.verify(token, process.env.SECRET, function(error,decoded) {
//         if (error) return res.status(500).send({auth: false, mensagem: 'Falha na autenticação do token'})
//         req.userId = decoded.id
//         next()
//     })
// }
//
// module.exports = verifyJWT()