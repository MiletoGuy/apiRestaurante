const Pool = require('pg').Pool
const pool = new Pool({
    user: 'gerente',
    host: 'localhost',
    database: 'restaurante',
    password: '1234',
    port: 5432,
});

const getProduto = () => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM produto ORDER BY id ASC', (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result);
        })
    })
}

const createProduto = (body) => {
    return new Promise(function(resolve, reject) {
        const { nome, valor, emEstoque, fornecedor } = body
        pool.query('INSERT INTO produto (nome, valor, emEstoque, fornecedor) VALUES ($1, $2, $3, $4) RETURNING *', [nome, valor, emEstoque, fornecedor], (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result.rows[0])
        })
    })
}

const deleteProduto = () => {
    return new Promise(function(resolve, reject) {
        const id = parseInt(request.params.id)
        pool.query('DELETE FROM produto WHERE id = $1', [id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Produto deletado com ID: ${id}`)
        })
    })
}

module.exports = {
    getProduto,
    createProduto,
    deleteProduto
}