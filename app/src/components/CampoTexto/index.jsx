import * as S from "./styled"

const CampoTexto = (props) => {
    return(
       <S.CampoTexto>
           <S.Label>{props.label}</S.Label>
           <S.Input required={props.obrigatorio} placeholder={props.input} type={props.tipo} value={props.valor} onChange={(e)=>props.onChange(e.target.value)}/>
       </S.CampoTexto>
    )
}

export default CampoTexto