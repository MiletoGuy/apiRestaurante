const express = require('express')
const app = express()

const rotaProdutos = require('./routes/produtos')
// const port = 3001

app.use('/produtos', rotaProdutos)

module.exports = app

//
// const model = require('./model')
//
// app.use(express.json())
//
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
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