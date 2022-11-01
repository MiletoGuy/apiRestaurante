const express = require('express')
const router = express.Router()
const pool = require('../postgresql').pool
const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token']
    if (!token) return res.status(401).send({auth: false, mensagem: 'Token não encontrado'})

    jwt.verify(token, process.env.SECRET, function (error, decoded) {
        if (error) return res.status(500).send({auth: false, mensagem: 'Falha na autenticação do token'})
        req.userId = decoded.id
        next()
    })
}

router.get('/', verifyJWT, (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM produto', [], (error, result) => {
            if (error) {
                console.log("erro")
                reject("Ocorreu um erro!", error)
            } else {
                resolve(result)
            }
        })
    })

    promise.then(result => {
        const response = {
            quantidade: result.rowCount,
            produtos: result.rows.map(row => {
                return {
                    id: row.id,
                    nome: row.nome,
                    valor: row.valor,
                    emEstoque: row.emestoque,
                    fornecedor: row.fornecedor,
                    request: {
                        tipo: 'GET',
                        descricao: 'Trás todos os produtos',
                        url: 'http://localhost:3001/produtos/' + row.id
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

router.post('/',verifyJWT, (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        const nome = req.body.nome
        const valor = req.body.valor
        const emEstoque = req.body.emEstoque
        const fornecedor = req.body.fornecedor
        pool.query('INSERT INTO produto (nome, valor, emEstoque, fornecedor) VALUES ($1, $2, $3, $4) RETURNING *', [nome, valor, emEstoque, fornecedor], (error, result) => {
            if (error) {
                reject("Erro de query!", error)
                console.log(error)
            } else {
                resolve(result)
            }
        })
    })

    promise.then(result => {
        const response = {
            mensagem: "Produto adicionado",
            produto: result.rows.map(row => {
                return {
                    id: row.id,
                    nome: row.nome,
                    valor: row.valor,
                    emEstoque: row.emEstoque,
                    fornecedor: row.fornecedor
                }
            }),
            request: {
                tipo: 'POST',
                descricao: 'Adiciona um produto',
                url: 'http://localhost:3001/produtos/' + result.rows[0].id
            }
        }
        res.status(200).send({response})
    }).catch(error => res.status(400).send({mensagem: "ocorreu um erro", error}))
})

router.get('/:id_produto',verifyJWT, (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        const id_produto = req.params.id_produto
        pool.query('SELECT * FROM produto WHERE id = $1', [id_produto], (error, result) => {
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
            produto: result.rows.map(row => {
                return {
                    id: row.id,
                    nome: row.nome,
                    valor: row.valor,
                    emEstoque: row.emEstoque,
                    fornecedor: row.fornecedor
                }
            }),
            request: {
                tipo: 'GET',
                descricao: 'Trás um produto especifico',
                url: 'http://localhost:3001/produtos/' + result.rows[0].id
            }
        }
        res.status(200).send({response})
    })
        .catch(error => res.status(400).send({mensagem: "ocorreu um erro", error}))
})

router.patch('/',verifyJWT, (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        const id_produto = req.body.id_produto
        const nome = req.body.nome
        const valor = req.body.valor
        const emEstoque = req.body.emEstoque
        const fornecedor = req.body.fornecedor
        pool.query('UPDATE produto SET nome = $1, valor = $2, emEstoque = $3, fornecedor = $4 WHERE id = $5 RETURNING *', [nome, valor, emEstoque, fornecedor, id_produto], (error, result) => {
            if (error) {
                reject("Erro de query!", error)
            } else {
                resolve(result)
            }
        })
    })


    promise.then(result => {
        const response = {
            mensagem: "Produto alterado",
            produto: result.rows.map(row => {
                return {
                    id: row.id,
                    nome: row.nome,
                    valor: row.valor,
                    emEstoque: row.emEstoque,
                    fornecedor: row.fornecedor
                }
            }),
            request: {
                tipo: 'PATCH',
                descricao: 'Atualiza um produto',
                url: 'http://localhost:3001/produtos/' + result.rows[0].id
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