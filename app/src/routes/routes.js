import {Route, BrowserRouter, Routes} from "react-router-dom"
import Login from "../pages/Login"
import Home from "../pages/Home"
import Pedidos from "../pages/Pedidos"
import Produtos from "../pages/Produtos"

const Rotas = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element = { <Login/>} path="/" exact/>
                <Route element = { <Pedidos/>} path="/pedidos"/>
                <Route element = { <Home/>} path="/home"/>
                <Route element = { <Produtos/>} path="/produtos"/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas