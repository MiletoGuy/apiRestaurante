import React, {useState} from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import * as S from "../Login/styled";

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
                <S.Titulo>Prencha seus dados para realizar o login</S.Titulo>
                <S.CampoTexto>
                    <S.Label>Nome</S.Label>
                    <S.Input required placeholder="Digite seu nome" value={nome} onChange={e => setNome(e.target.value)}/>
                </S.CampoTexto>
                <S.CampoTexto>
                    <S.Label>Senha</S.Label>
                    <S.Input required placeholder="Digite sua senha" value={senha} type="password" onChange={e => setSenha(e.target.value)}/>
                </S.CampoTexto>
                <S.Button>Entrar</S.Button>
            </S.Form>
        </S.Container>
    )
}

export default Login