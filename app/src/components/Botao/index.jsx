import * as S from "./styled"

const Botao = (props) => {
    return (
        <S.Button onClick={props.onClick}>{props.children}</S.Button>
    )
}

export default Botao