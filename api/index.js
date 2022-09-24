const express = require('express')
const app = express()
// const model = require('./model')
const morgan = require('morgan')

const rotaProdutos = require('./routes/produtos')
const rotaPedidos = require('./routes/pedidos')
const bodyParser = require('body-parser')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, ' +
        'X-Requested-With,' +
        'Content-Type,' +
        'Accept,' +
        'Authorization');

    if (req.method === 'OPTIONS'){
        res.headers('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).send({})
    }
    next()
})

app.use('/produtos', rotaProdutos)
app.use('/pedidos', rotaPedidos)

app.use((req, res, next) => {
    const erro = new Error('Rota não encontrada')
    erro.status = 404
    next(erro)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})

module.exports = app

//
//
// app.use(express.json())
//
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//     next();
// });
//
// app.get('/', (req, res) => {
//     model.getProduto()
//         .then(response => {
//             res.status(200).send(response);
//         })
//         .catch(error => {
//             res.status(500).send(error);
//         })
// })
//
// app.post('/produto', (req, res) => {
//     model.createProduto(req.body)
//         .then(response => {
//             res.status(200).send(response);
//         })
//         .catch(error => {
//             res.status(500).send(error);
//         })
// })
//
// app.delete('/produto/:id', (req, res) => {
//     model.deleteProduto(req.params.id)
//         .then(response => {
//             res.status(200).send(response);
//         })
//         .catch(error => {
//             res.status(500).send(error);
//         })
// })
//
// app.listen(port, () => {
//     console.log(`Api rodando na porta: ${port}.`)
// })