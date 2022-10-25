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


    return (
        <S.Container>
            <Button onClick={navPedidos} variant="contained" sx={{marginBottom: 1}}>Pedidos</Button>
            <Button onClick={navProdutos} variant="contained">Produtos</Button>
        </S.Container>
    )
}

export default Home