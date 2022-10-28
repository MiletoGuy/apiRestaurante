import React, {useEffect, useState} from "react"
import * as S from './styled'
import {DataGrid} from '@mui/x-data-grid'
import {Button, Input, TextField} from "@mui/material"
import axios from 'axios'
import Modal from '@mui/material/Modal'
import {useNavigate} from "react-router-dom";

const Clientes = () => {
    const [clientes, setClientes] = useState('')
    const [cliente, setCliente] = useState('')
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
        getClientes()
    }, [])


    const getClientes = () => {
        axios.get('http://localhost:3001/clientes', {
                headers: {
                    'x-access-token': window.sessionStorage.getItem('token')
                }
            }
        )
            .then(res => setClientes(res.data.response.clientes))
            .catch(err => console.log(err))
    }

    const handleSubmit = () => {
        alert("Novo cliente cadastrado\n" +
            "\nCliente: " + cliente +
            "\nEmail: " + email +
            "\nCPF: " + cpf +
            "\nTelefone: " + telefone
        )
        axios.post('http://localhost:3001/clientes',{
            nome: cliente,
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
            headerName: 'Nome',
            width: 150,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
        },
        {
            field: 'cpf',
            headerName: 'CPF',
            width: 110,
        },
        {
            field: 'telefone',
            headerName: 'Telefone',
            type: 'number',
            width: 160,
        }
    ];

    const navHome = () => {
        navigate(`/home`)
    }

    return (
        <S.Container>
            <Button variant="contained" onClick={navHome} sx={{width: 100, marginLeft: 1, marginBottom: 1}}>Home</Button>
            <S.Box>
                <Input/>
                <Button variant="contained" onClick={handleOpen}>Novo Cliente</Button>
            </S.Box>
            <DataGrid
                autoHeight={true}
                rows={clientes}
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
                    <S.Titulo>Cadastro de Cliente</S.Titulo>
                    <S.Form onSubmit={handleSubmit}>
                        <TextField label="Nome do Cliente" variant="outlined" required size="normal" onChange={e => setCliente(e.target.value)}/>
                        <TextField label="Email" variant="outlined" required size="normal" onChange={e => setEmail(e.target.value)}/>
                        <TextField label="CPF" variant="outlined" required size="normal" onChange={e => setCpf(e.target.value)}/>
                        <TextField label="Telefone" variant="outlined" required size="normal" onChange={e => setTelefone(e.target.value)}/>
                        <Button variant="contained" onClick={handleSubmit}>Confirmar</Button>
                    </S.Form>
                </S.Modal>
            </Modal>
        </S.Container>
    )
}

export default Clientes