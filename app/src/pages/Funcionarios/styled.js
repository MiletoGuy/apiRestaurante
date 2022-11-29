import styled from "styled-components"

export const Container = styled.section`
  display: flex;
  background-color: #efefef;
  flex-direction: column;
  justify-content: center;
`

export const Box = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;
  margin: 0;
  max-height: 100px;
  padding: 5px;
`

export const Modal = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  width: 80%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #efefef;
  border: #000 double 2px;
  border-radius: 5px;
`

export const Titulo = styled.label`
  width: 100%;
  text-align: center;
  border-bottom: gray solid 1px;
`

export const Form = styled.form`
  display: flex;
  margin-top: 12px;
  flex-direction: row;
  width: 100%;
`