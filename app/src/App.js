import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
    const [produto, setProduto] = useState(false);

    useEffect(() => {
        getProduto();
    }, []);

    function getProduto() {
        fetch('http://localhost:3001')
            .then(response => {
                return response.text();
            })
            .then(data => {
                setProduto(data);
            });
    }
    function createProduto() {
        let nome = prompt('Digite o nome do produto');
        let valor = prompt('Digite o valor do produto');
        let emEstoque = prompt('Digite a quantidade em estoque do produto')
        let fornecedor = prompt('Digite o ID do fornecedor desse produto')

        fetch('http://localhost:3001/produto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({nome, valor, emEstoque, fornecedor}),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                getProduto();
            });
    }
    function deleteProduto() {
        let id = prompt('Digite o ID do produto');
        fetch(`http://localhost:3001/produto/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                getProduto();
            });
    }

    return (
    <div className="App">
      <header className="App-header">
       <button onClick={createProduto}>Novo Produto</button>
       <button onClick={deleteProduto}>Deletar Produto</button>
      </header>
    </div>
  );
}

export default App;
