import styled from "styled-components"

export const Container = styled.section`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const Form = styled.form`
  background-color: #F2F2F2;
  border-radius: 20px;
  padding: 5% 10%;
  box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.08);
  align-items: center;
  display: flex;
  flex-direction: column;
`
export const Button = styled.button`
  background-color: #6278f7;
  border-radius: 10px;
  width: 50%;
  font-weight: bold;
  font-size: 18px;
  padding: 5%;
  border: none;
  cursor: pointer;
  color: #FFF;

  &:hover {
    background-color: #5569f8;
    color: #e0e0e0;
  }
`