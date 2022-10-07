import React, {useState} from "react"
import * as S from "./styled"

const LoginForm = () => {
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')
    const headlersubmit = (e) => {
        e.preventDefault()
    }

    return(
        <S.Container>
            <S.Form onSubmit={headlersubmit}>
                <S.Input placeholder="nome" value={nome} onChange={(e)=>{setNome(e.target.value)}}/>
                <S.Input placeholder="senha" value={senha} onChange={(e)=>{setSenha(e.target.value)}}/>
                <S.Botao>Enviar</S.Botao>

            </S.Form>
        </S.Container>
    )
}

export default LoginForm