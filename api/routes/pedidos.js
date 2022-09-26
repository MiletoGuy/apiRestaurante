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

router.get('/',verifyJWT, (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM pedido', [], (error, result) => {
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
            pedidos: result.rows.map(row => {
                return {
                    id: row.id,
                    quantidade: row.quantidade,
                    id_produto: row.id_produto,
                    id_cliente: row.id_cliente,
                    id_funcionario: row.id_funcionario,
                    request: {
                        tipo: 'GET',
                        descricao: 'Trás todos os pedidos',
                        url: 'http://localhost:3001/pedidos/' + row.id
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
        const quantidade = req.body.quantidade
        const id_produto = req.body.id_produto
        const id_cliente = req.body.id_cliente
        const id_funcionario = req.body.id_funcionario
        pool.query('INSERT INTO pedido (quantidade, id_produto, id_cliente, id_funcionario,estado) VALUES ($1, $2, $3, $4,$5) RETURNING *', [quantidade, id_produto, id_cliente, id_funcionario,"ABERTO"], (error, result) => {
            if (error) {
                console.log(error)
                reject("Ocorreu um erro!", error)
            } else {
                resolve(result)
            }
        })
    })

    promise.then(result => {
        const response = {
            mensagem: "Pedido cadastrado",
            pedido: result.rows.map(row => {
                return {
                    id: row.id,
                    produto: row.id_produto,
                    cliente: row.id_cliente,
                    funcionario: row.id_funcionario,
                    estado: row.estado
                }
            }),
            request: {
                tipo: 'POST',
                descricao: 'Abre um pedido',
                url: 'http://localhost:3001/pedidos/' + result.rows[0].id
            }
        }
        res.status(200).send({response})
    }).catch(error => res.status(400).send({mensagem: "ocorreu um erro", error}))
})

router.get('/:id_pedido',verifyJWT, (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        const id_pedido = req.params.id_pedido
        pool.query('SELECT * FROM pedido WHERE id = $1', [id_pedido], (error, result) => {
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
                    produto: row.id_produto,
                    cliente: row.id_cliente,
                    funcionario: row.id_funcionario,
                    estado: row.estado
                }
            }),
            request: {
                tipo: 'GET',
                descricao: 'Trás um pedido especifico',
                url: 'http://localhost:3001/pedidos/' + result.rows[0].id
            }
        }
        res.status(200).send({response})
    })
        .catch(error => res.status(400).send({mensagem: "ocorreu um erro", error}))
})

router.patch('/',verifyJWT, (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        const id_pedido = req.body.id_pedido
        const quantidade = req.body.quantidade
        const id_produto = req.body.id_produto
        const id_cliente = req.body.id_cliente
        const id_funcionario = req.body.id_funcionario
        const estado = req.body.estado
        pool.query('UPDATE pedido SET quantidade = $1, id_produto = $2, id_cliente = $3, id_funcionario = $4, estado = $5 WHERE id = $6 RETURNING *', [quantidade, id_produto, id_cliente, id_funcionario,estado, id_pedido], (error, result) => {
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
            mensagem: "Pedido alterado",
            cliente: result.rows.map(row => {
                return {
                    id: row.id,
                    produto: row.id_produto,
                    cliente: row.id_cliente,
                    funcionario: row.id_funcionario,
                    estado: row.estado
                }
            }),
            request: {
                tipo: 'PATCH',
                descricao: 'Atualiza um pedido',
                url: 'http://localhost:3001/pedidos/' + result.rows[0].id
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