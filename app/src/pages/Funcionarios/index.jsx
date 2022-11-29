import React, {useEffect, useState} from "react"
import * as S from './styled'
import {DataGrid} from '@mui/x-data-grid'
import {Button, TextField} from "@mui/material"
import axios from 'axios'
import Modal from '@mui/material/Modal'
import {useNavigate} from "react-router-dom";

const Funcionarios = () => {
    const [funcionarios, setFuncionarios] = useState('')
    const [funcionario, setFuncionario] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        getFuncionarios()
    }, [])


    const getFuncionarios = () => {
        axios.get('http://localhost:3001/funcionarios', {
                headers: {
                    'x-access-token': window.sessionStorage.getItem('token')
                }
            }
        )
            .then(res => setFuncionarios(res.data.response.funcionarios))
            .catch(err => console.log(err))
    }

    const handleSubmit = () => {
        alert("Novo funcionário cadastrado\n" +
            "\nFuncinário: " + funcionario +
            "\nEmail: " + email +
            "\nCPF: " + cpf +
            "\nTelefone: " + telefone
        )
        axios.post('http://localhost:3001/funcionarios',{
            nome: funcionario,
            email: email,
            cpf: cpf,
            telefone: telefone
        }, {
            headers: {
                'x-access-token': window.sessionStorage.getItem('token')
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        handleClose()
        document.location.reload()
    }


    const columns = [
        {field: 'id', headerName: 'ID', width: 90},
        {
            field: 'nome',
            headerName: 'NOME',
            width: 150,
        },
        {
            field: 'email',
            headerName: 'EMAIL',
            width: 250,
        },
        {
            field: 'cpf',
            headerName: 'CPF',
            width: 140,
        },
        {
            field: 'telefone',
            headerName: 'TELEFONE',
            width: 160,
        },
        {
            field: 'entrada',
            headerName: 'ENTRADA',
            width: 200,
        },
        {
            field: 'saida',
            headerName: 'SAÍDA',
            width: 200,
        }
    ];

    const navHome = () => {
        navigate(`/home`)
    }

    return (
        <S.Container>
            <S.Box>
                <Button variant="outlined" onClick={navHome}
                        sx={{width: 100}}>Home</Button>
                <Button variant="outlined" onClick={handleOpen}
                        sx={{width: 190}}>Novo Funcionário</Button>
            </S.Box>
            <DataGrid
                autoHeight={true}
                rows={funcionarios}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                experimentalFeatures={{newEditingApi: true}}
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <S.Modal>
                    <S.Titulo>Cadastro de Funcionário</S.Titulo>
                    <S.Form onSubmit={handleSubmit}>
                        <TextField label="Nome do Funcionário" variant="outlined" required size="normal" onChange={e => setFuncionario(e.target.value)}/>
                        <TextField label="Email" variant="outlined" required size="normal" onChange={e => setEmail(e.target.value)}/>
                        <TextField label="CPF" variant="outlined" type="number" required size="normal" onChange={e => setCpf(e.target.value)}/>
                        <TextField label="Telefone" variant="outlined" type="number" required size="normal" onChange={e => setTelefone(e.target.value)}/>
                        <Button variant="outlined" onClick={handleSubmit}>Confirmar</Button>
                    </S.Form>
                </S.Modal>
            </Modal>
        </S.Container>
    )
}

export default Funcionarios