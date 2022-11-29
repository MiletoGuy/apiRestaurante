import React, {useEffect} from "react"
import * as S from './styled'
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";


const Home = () => {
    const navigate = useNavigate()


    useEffect(() => {

    }, [])

    const navPedidos = () => {
        navigate('/pedidos')
    }

    const navProdutos = () => {
        navigate('/produtos')
    }

    const navClientes = () => {
        navigate('/clientes')
    }

    const navFornecedores = () => {
        navigate('/fornecedores')
    }

    const navFuncionarios = () => {
        navigate('/funcionarios')
    }

    const sair = () => {
        window.sessionStorage.clear()
        navigate('/')
    }

    return (
        <S.Container>
            <Button onClick={navPedidos} variant="outlined" sx={{marginBottom: 1}}>Pedidos</Button>
            <Button onClick={navProdutos} variant="outlined" sx={{marginBottom: 1}}>Produtos</Button>
            <Button onClick={navClientes} variant="outlined" sx={{marginBottom: 1}}>Clientes</Button>
            <Button onClick={navFornecedores} variant="outlined" sx={{marginBottom: 1}}>Fornecedores</Button>
            <Button onClick={navFuncionarios} variant="outlined" sx={{marginBottom: 1}}>Funcionarios</Button>
            <Button onClick={sair} variant="outlined" sx={{marginBottom: 1}}>sair</Button>
        </S.Container>
    )
}

export default Home