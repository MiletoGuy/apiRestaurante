const express = require('express')
const router = express.Router()
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'gerente',
    host: 'localhost',
    database: 'restaurante',
    password: '1234',
    port: 5432,
});

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: "Retorna todos os produtos"
    })
})

router.post('/', (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        const nome = req.body.nome
        const valor = req.body.valor
        const emEstoque = req.body.emEstoque
        const fornecedor = req.body.fornecedor
        pool.query('INSERT INTO produto (nome, valor, emEstoque, fornecedor) VALUES ($1, $2, $3, $4) RETURNING *', [nome, valor, emEstoque, fornecedor], (error, result) => {
            if (error) {
                reject("Ocorreu um erro!", error)
            } else {
                resolve("Deu certo!", result)
            }
        })
    })

    promise.then(
        (result) => {
            res.status(201).send({mensagen: "Produto adicionado"})
            console.log(result)
        },
        (error) => {
            res.status(400).send({mensagem: "ocorreu um erro"})
            console.log(error)
        })
})

router.get('/:id_produto', (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        const id_produto = req.params.id_produto
        console.log("O id é: ", id)
        pool.query('SELECT * FROM produto WHERE id = $1', [id_produto], (error, result) => {
            if (error) {
                reject("Ocorreu um erro!", error)
            }
            resolve("Deu certo!", result)
        })

        promise.then(
            (result) => {
                res.status(201).send({resultado: result})
                console.log(result)
            },
            (error) => {
                res.status(400).send({mensagem})
            }
        )
    })
})

router.patch('/', (req, res, next) => {
    res.status(200).send({
        mensagem: "Produto alterado"
    })
})

router.delete('/', (req, res, next) => {
    res.status(200).send({
        mensagem: "Produto excluido"
    })
})

module.exports = router