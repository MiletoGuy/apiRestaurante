const express = require('express')
const router = express.Router()
const pool = require('../postgresql').pool
const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token']
    if (!token) return res.status(401).send({auth: false, mensagem: 'Token não encontrado'})

    jwt.verify(token, process.env.SECRET, function(error,decoded) {
        if (error) return res.status(500).send({auth: false, mensagem: 'Falha na autenticação do token'})
        req.userId = decoded.id
        next()
    })
}

router.get('/',verifyJWT,  (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM funcionario', [], (error, result) => {
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
        const response = {
            quantidade: result.rowCount,
            funcionarios: result.rows.map(row => {
                return {
                    id: row.id,
                    nome: row.nome,
                    email: row.email,
                    cpf: row.cpf,
                    telefone: row.telefone,
                    entrada: row.dt_entrada,
                    saida: row.dt_saida,
                    request: {
                        tipo: 'GET',
                        descricao: 'Trás todos os funcionarios',
                        url: 'http://localhost:3001/funcionarios/' + row.id
                    }
                }
            })
        }
        res.status(200).send({response})
    })
        .catch(error =>
            res.status(400).send({mensagem: "ocorreu um erro", error})
        )

})

router.post('/',verifyJWT,  (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        const nome = req.body.nome
        const email = req.body.email
        const cpf = req.body.cpf
        const telefone = req.body.telefone
        pool.query('INSERT INTO funcionario (nome, email, cpf, telefone,dt_entrada) VALUES ($1, $2, $3, $4, NOW()) RETURNING *', [nome, email, cpf, telefone], (error, result) => {
            if (error) {
                reject("Ocorreu um erro!", error)
            } else {
                resolve(result)
            }
        })
    })

    promise.then(result => {
        const response = {
            mensagem: "Funcionario cadastrado",
            funcionario: result.rows.map(row => {
                return {
                    id: row.id,
                    nome: row.nome,
                    email: row.email,
                    cpf: row.cpf,
                    telefone: row.telefone,
                    entrada: row.dt_entrada
                }
            }),
            request: {
                tipo: 'POST',
                descricao: 'Cadastra um funcionario',
                url: 'http://localhost:3001/funcionarios/' + result.rows[0].id
            }
        }
        res.status(200).send({response})
    }).catch(error => res.status(400).send({mensagem: "ocorreu um erro", error}))
})

router.get('/:id_funcionario',verifyJWT,  (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        const id_funcionario = req.params.id_funcionario
        pool.query('SELECT * FROM funcionario WHERE id = $1', [id_funcionario], (error, result) => {
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
        const response = {
            funcionario: result.rows.map(row => {
                return {
                    id: row.id,
                    nome: row.nome,
                    email: row.email,
                    cpf: row.cpf,
                    telefone: row.telefone,
                    entrada: row.dt_entrada,
                    saida: row.dt_saida
                }
            }),
            request: {
                tipo: 'GET',
                descricao: 'Trás um funcionario especifico',
                url: 'http://localhost:3001/funcionario/' + result.rows[0].id
            }
        }
        res.status(200).send({response})
    })
        .catch(error => res.status(400).send({mensagem: "ocorreu um erro", error}))
})

router.patch('/',verifyJWT,  (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        const id_funcionario = req.body.id_funcionario
        const nome = req.body.nome
        const email = req.body.email
        const cpf = req.body.cpf
        const telefone = req.body.telefone
        pool.query('UPDATE funcionario SET nome = $1, email = $2, cpf = $3, telefone = $4 WHERE id = $5 RETURNING *', [nome, email, cpf, telefone, id_funcionario], (error, result) => {
            if (error) {
                console.log(error)
                reject("Ocorreu um erro!", error)
            } else {
                console.log("ok")
                resolve(result)
            }
        })
    })

    promise.then(result => {
        const response = {
            mensagem: "Funcionario alterado",
            funcionario: result.rows.map(row => {
                return {
                    id: row.id,
                    nome: row.nome,
                    email: row.email,
                    cpf: row.cpf,
                    telefone: row.telefone,
                    entrada: row.dt_entrada,
                    saida: row.dt_saida
                }
            }),
            request: {
                tipo: 'PATCH',
                descricao: 'Atualiza um funcionario',
                url: 'http://localhost:3001/funcionarios/' + result.rows[0].id
            }
        }
        res.status(200).send({response})
    })
        .catch(error => res.status(400).send({mensagem: "ocorreu um erro", error}))
})

router.delete('/', (req, res, next) => {
    res.status(200).send({
        mensagem: "Produto excluido"
    })
})

module.exports = router