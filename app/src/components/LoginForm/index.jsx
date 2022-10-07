import React, {useState} from "react"
import * as S from "./styled"
import CampoTexto from "../CampoTexto";
import Botao from "../Botao";
import axios from "axios";

const LoginForm = () => {
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')
    const [token,setToken] = useState('')
    const headlersubmit = (e) => {
        const qs = require('qs');
        e.preventDefault()
        console.log("Submit do formulário =>", nome, senha)
        axios.post('http://localhost:3001/login', qs.stringify({'usuario': nome, 'senha': senha}))
            .then(res => setToken(res.data.token))
            .catch(err => console.log(err))
        console.log(token)
        setSenha('')
        setNome('')
    }

    return (
        <S.Container>
            <S.Form onSubmit={headlersubmit}>
                <h2>Prencha seus dados para realizar o login</h2>
                <CampoTexto obrigatorio={true} label="Nome" input="Digite seu nome" onChange={nome => setNome(nome)}
                            valor={nome}/>
                <CampoTexto obrigatorio={true} label="Senha" input="Digite sua senha" tipo="password"
                            onChange={senha => setSenha(senha)} valor={senha}/>
                <Botao>Entrar</Botao>
            </S.Form>
        </S.Container>
    )
}

export default LoginForm