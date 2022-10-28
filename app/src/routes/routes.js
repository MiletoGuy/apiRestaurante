import {Route, BrowserRouter, Routes} from "react-router-dom"
import Login from "../pages/Login"
import Home from "../pages/Home"
import Pedidos from "../pages/Pedidos"
import Produtos from "../pages/Produtos"
import Clientes from "../pages/Clientes";
import Fornecedores from "../pages/Fornecedores";
import Funcionarios from "../pages/Funcionarios";

const Rotas = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element = { <Login/>} path="/" exact/>
                <Route element = { <Pedidos/>} path="/pedidos"/>
                <Route element = { <Home/>} path="/home"/>
                <Route element = { <Produtos/>} path="/produtos"/>
                <Route element = { <Clientes/>} path="/clientes"/>
                <Route element = { <Fornecedores/>} path="/fornecedores"/>
                <Route element = { <Funcionarios/>} path="/funcionarios"/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas