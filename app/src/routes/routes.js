import {Route, BrowserRouter, Routes} from "react-router-dom"
import Login from "../pages/Login";
import Home from "../pages/Home";

const Rotas = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element = { <Login/>} path="/" exact/>
                <Route element = { <Home/>} path="/home"/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas