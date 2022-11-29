import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  justify-content: center;
  margin: 80px 0;
`

export const Form = styled.form`
  max-width: 100%;
  background-color: #ffffff;
  padding: 36px 64px;
`

export const Button = styled.button`
  background-color: #6278f7;
  border-radius: 10px;
  width: 100%;
  font-weight: 700;
  font-size: 18px;
  padding: 32px;
  border: none;
  cursor: pointer;
  color: #FFF;
  margin: 32px 0;

  &:hover {
    background-color: #5569f8;
    color: #e0e0e0;
  }
`

export const Titulo = styled.label`
  font-size: 28px;
  font-weight: bold;
`

export const CampoTexto = styled.div`
    margin: 24px 0;
`

export const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    font-size: 24px;
`

export const Input = styled.input`
    background-color: #FFF;
    width: 100%;
    border: solid black 1px;
    font-size: 24px;
    padding: 24px;
`