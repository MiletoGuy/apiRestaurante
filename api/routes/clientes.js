const express = require('express')
const router = express.Router()
const pool = require('../postgresql').pool

router.get('/', (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM cliente', [], (error, result) => {
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
            clientes: result.rows.map(row => {
                return {
                    id: row.id,
                    nome: row.nome,
                    email: row.email,
                    cpf: row.cpf,
                    telefone: row.telefone,
                    request: {
                        tipo: 'GET',
                        descricao: 'Trás todos os clientes',
                        url: 'http://localhost:3001/clientes/' + row.id
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

router.post('/', (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        const nome = req.body.nome
        const email = req.body.email
        const cpf = req.body.cpf
        const telefone = req.body.telefone
        pool.query('INSERT INTO cliente (nome, email, cpf, telefone) VALUES ($1, $2, $3, $4) RETURNING *', [nome, email, cpf, telefone], (error, result) => {
            if (error) {
                reject("Ocorreu um erro!", error)
            } else {
                resolve(result)
            }
        })
    })

    promise.then(result => {
        const response = {
            mensagem: "Cliente cadastrado",
            cliente: result.rows.map(row => {
                return {
                    id: row.id,
                    nome: row.nome,
                    email: row.email,
                    cpf: row.cpf,
                    telefone: row.telefone
                }
            }),
            request: {
                tipo: 'POST',
                descricao: 'Cadastra um cliente',
                url: 'http://localhost:3001/clientes/' + result.rows[0].id
            }
        }
        res.status(200).send({response})
    }).catch(error => res.status(400).send({mensagem: "ocorreu um erro", error}))
})

router.get('/:id_cliente', (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        const id_cliente = req.params.id_cliente
        pool.query('SELECT * FROM cliente WHERE id = $1', [id_cliente], (error, result) => {
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
            cliente: result.rows.map(row => {
                return {
                    id: row.id,
                    nome: row.nome,
                    email: row.email,
                    cpf: row.cpf,
                    telefone: row.telefone
                }
            }),
            request: {
                tipo: 'GET',
                descricao: 'Trás um cliente especifico',
                url: 'http://localhost:3001/clientes/' + result.rows[0].id
            }
        }
        res.status(200).send({response})
    })
        .catch(error => res.status(400).send({mensagem: "ocorreu um erro", error}))
})

router.patch('/', (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        const id_cliente = req.body.id_cliente
        const nome = req.body.nome
        const email = req.body.email
        const cpf = req.body.cpf
        const telefone = req.body.telefone
        pool.query('UPDATE cliente SET nome = $1, email = $2, cpf = $3, telefone = $4 WHERE id = $5 RETURNING *', [nome, email, cpf, telefone, id_cliente], (error, result) => {
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
            mensagem: "Cliente alterado",
            cliente: result.rows.map(row => {
                return {
                    id: row.id,
                    nome: row.nome,
                    email: row.email,
                    cpf: row.cpf,
                    telefone: row.telefone
                }
            }),
            request: {
                tipo: 'PATCH',
                descricao: 'Atualiza um cliente',
                url: 'http://localhost:3001/clientes/' + result.rows[0].id
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