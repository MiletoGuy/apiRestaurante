import './App.css';

function App() {

    function getProduto() {
        fetch('http://localhost:3001/produto')
            .then(response => {
                console.log(response)
                console.log(response.json())
                console.log(JSON.stringify(response))
            })
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
        }).then(response => {
            response.text()
        })
    }

    function deleteProduto() {
        let id = prompt('Digite o ID do produto');
        fetch(`http://localhost:3001/produto/${id}`, {
            method: 'DELETE'
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
       <button onClick={getProduto}>Select teste</button>
      </header>
    </div>
  );
}

export default App;
