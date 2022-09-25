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
    let promise = new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM produto', [], (error, result) => {
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
            produtos: result.rows.map(prod => {
                return {
                    id: prod.id,
                    nome: prod.nome,
                    valor: prod.valor,
                    emEstoque: prod.emEstoque,
                    fornecedor: prod.fornecedor,
                    request: {
                        tipo: 'GET',
                        descricao: 'Trás todos os produtos',
                        url: 'http://localhost:3001/produtos/' + prod.id
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
            res.status(201).send({mensagen: "Produto adicionado"})//teste
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

// router.patch('/', (req, res, next) => {
//     res.status(200).send({
//         mensagem: "Produto alterado"
//     })
// })

router.delete('/', (req, res, next) => {
    res.status(200).send({
        mensagem: "Produto excluido"
    })
})

module.exports = router