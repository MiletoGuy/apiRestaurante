const express = require('express')
const router = express.Router()
const pool = require('../postgresql').pool

router.get('/', (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM fornecedor', [], (error, result) => {
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
            fornecedores: result.rows.map(row => {
                return {
                    id: row.id,
                    nome: row.nome,
                    email: row.email,
                    cnpj: row.cnpj,
                    telefone: row.telefone,
                    request: {
                        tipo: 'GET',
                        descricao: 'Trás todos os fornecedores',
                        url: 'http://localhost:3001/fornecedores/' + row.id
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
        const cnpj = req.body.cnpj
        const telefone = req.body.telefone
        pool.query('INSERT INTO fornecedor (nome, email, cnpj, telefone) VALUES ($1, $2, $3, $4) RETURNING *', [nome, email, cnpj, telefone], (error, result) => {
            if (error) {
                reject("Ocorreu um erro!", error)
            } else {
                resolve(result)
            }
        })
    })

    promise.then(result => {
        const response = {
            mensagem: "Fornecedor cadastrado",
            fornecedor: result.rows.map(row => {
                return {
                    id: row.id,
                    nome: row.nome,
                    email: row.email,
                    cnpj: row.cnpj,
                    telefone: row.telefone
                }
            }),
            request: {
                tipo: 'POST',
                descricao: 'Cadastra um fornecedor',
                url: 'http://localhost:3001/fornecedores/' + result.rows[0].id
            }
        }
        res.status(200).send({response})
    }).catch(error => res.status(400).send({mensagem: "ocorreu um erro", error}))
})

router.get('/:id_fornecedor', (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        const id_fornecedor = req.params.id_fornecedor
        pool.query('SELECT * FROM fornecedor WHERE id = $1', [id_fornecedor], (error, result) => {
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
            fornecedor: result.rows.map(row => {
                return {
                    id: row.id,
                    nome: row.nome,
                    email: row.email,
                    cnpj: row.cnpj,
                    telefone: row.telefone
                }
            }),
            request: {
                tipo: 'GET',
                descricao: 'Trás um fornecedor especifico',
                url: 'http://localhost:3001/fornecedores/' + result.rows[0].id
            }
        }
        res.status(200).send({response})
    })
        .catch(error => res.status(400).send({mensagem: "ocorreu um erro", error}))
})

router.patch('/', (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        const id_fornecedor = req.body.id_fornecedor
        const nome = req.body.nome
        const email = req.body.email
        const cnpj = req.body.cnpj
        const telefone = req.body.telefone
        pool.query('UPDATE fornecedor SET nome = $1, email = $2, cnpj = $3, telefone = $4 WHERE id = $5 RETURNING *', [nome, email, cnpj, telefone, id_fornecedor], (error, result) => {
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
            mensagem: "fornecedor alterado",
            fornecedor: result.rows.map(row => {
                return {
                    id: row.id,
                    nome: row.nome,
                    email: row.email,
                    cnpj: row.cnpj,
                    telefone: row.telefone
                }
            }),
            request: {
                tipo: 'PATCH',
                descricao: 'Atualiza um fornecedor',
                url: 'http://localhost:3001/fornecedores/' + result.rows[0].id
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