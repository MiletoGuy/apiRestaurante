import React, {useState} from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import * as S from "./styled";
import CampoTexto from "../../components/CampoTexto";

const Login = () => {
    const qs = require('qs')
    const navigate = useNavigate()
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/login', qs.stringify({'usuario': nome, 'senha': senha}))
            .then(res => {
                const token = res.data.token
                window.sessionStorage.setItem('userId', res.data.userId)
                window.sessionStorage.setItem('token', token)
                axios.defaults.headers.common['x-access-token'] = token
                if(res.data.auth === true) navigate('/home')
                else alert('Login Inválido')
            })
            .catch(err => console.log(err))
        setSenha('')
        setNome('')
    }

    return (
        <S.Container>
            <S.Form onSubmit={handleSubmit}>
                <h2>Prencha seus dados para realizar o login</h2>
                <CampoTexto obrigatorio={true} label="Nome" input="Digite seu nome" onChange={nome => setNome(nome)}
                            valor={nome}/>
                <CampoTexto obrigatorio={true} label="Senha" input="Digite sua senha" tipo="password"
                            onChange={senha => setSenha(senha)} valor={senha}/>
                <S.Button>Entrar</S.Button>
            </S.Form>
        </S.Container>
    )
}

export default Login