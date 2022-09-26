const express = require('express')
const router = express.Router()
const pool = require('../postgresql').pool

router.get('/', (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM usuario', [], (error, result) => {
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
            usuarios: result.rows.map(row => {
                return {
                    id: row.id,
                    usuario: row.usuario,
                    senha: row.senha,
                    request: {
                        tipo: 'GET',
                        descricao: 'Trás todos os usuários',
                        url: 'http://localhost:3001/usuarios/' + row.id
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
        const usuario = req.body.usuario
        const senha = req.body.senha

        pool.query('INSERT INTO usuario (usuario, senha) VALUES ($1, $2) RETURNING *', [usuario, senha], (error, result) => {
            if (error) {
                reject("Ocorreu um erro!", error)
            } else {
                resolve(result)
            }
        })
    })

    promise.then(result => {
        const response = {
            mensagem: "Usuario cadastrado",
            usuario: result.rows.map(row => {
                return {
                    id: row.id,
                    usuario: row.usuario,
                    senha: row.senha
                }
            }),
            request: {
                tipo: 'POST',
                descricao: 'Cadastra um usuario',
                url: 'http://localhost:3001/usuarios/' + result.rows[0].id
            }
        }
        res.status(200).send({response})
    }).catch(error => res.status(400).send({mensagem: "ocorreu um erro", error}))
})

router.get('/:id_usuario', (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        const id_usuario = req.params.id_usuario
        pool.query('SELECT * FROM usuario WHERE id = $1', [id_usuario], (error, result) => {
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
                    usuario: row.usuario,
                    senha: row.senha
                }
            }),
            request: {
                tipo: 'GET',
                descricao: 'Trás um usuário especifico',
                url: 'http://localhost:3001/usuarios/' + result.rows[0].id
            }
        }
        res.status(200).send({response})
    })
        .catch(error => res.status(400).send({mensagem: "ocorreu um erro", error}))
})

router.patch('/', (req, res, next) => {
    let promise = new Promise(function (resolve, reject) {
        const id_usuario = req.body.id_usuario
        const usuario = req.body.usuario
        const senha = req.body.senha
        pool.query('UPDATE usuario SET usuario = $1, senha = $2 WHERE id = $3 RETURNING *', [usuario, senha, id_usuario], (error, result) => {
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
            mensagem: "Usuário alterado",
            usuario: result.rows.map(row => {
                return {
                    id: row.id,
                    usuario: row.usuario,
                    senha: row.senha
                }
            }),
            request: {
                tipo: 'PATCH',
                descricao: 'Atualiza um usuário',
                url: 'http://localhost:3001/usuarios/' + result.rows[0].id
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