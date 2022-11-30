import React, {useEffect, useState} from "react"
import * as S from './styled'
import {DataGrid} from '@mui/x-data-grid'
import {Button, IconButton, Input, TextField} from "@mui/material"
import axios from 'axios'
import Modal from '@mui/material/Modal'
import {useNavigate} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const Fornecedores = () => {
    const [fornecedores, setFornecedores] = useState('')
    const [fornecedor, setFornecedor] = useState('')
    const [email, setEmail] = useState('')
    const [cnpj, setCnpj] = useState('')
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
        getFornecedores()
    }, [])


    const getFornecedores = () => {
        axios.get('http://localhost:3001/fornecedores', {
                headers: {
                    'x-access-token': window.sessionStorage.getItem('token')
                }
            }
        )
            .then(res => setFornecedores(res.data.response.fornecedores))
            .catch(err => console.log(err))
    }

    const handleSubmit = () => {
        alert("Novo fornecedor cadastrado\n" +
            "\nFornecedor: " + fornecedor +
            "\nEmail: " + email +
            "\nCNPJ: " + cnpj +
            "\nTelefone: " + telefone
        )
        axios.post('http://localhost:3001/fornecedores',{
            nome: fornecedor,
            email: email,
            cnpj: cnpj,
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
            width: 250,
        },
        {
            field: 'cnpj',
            headerName: 'CNPJ',
            width: 140,
        },
        {
            field: 'telefone',
            headerName: 'Telefone',
            width: 160,
        }
    ];

    const navHome = () => {
        navigate(`/home`)
    }

    return (
        <S.Container>
            <S.Titulo>Fornecedores</S.Titulo>
            <IconButton onClick={navHome} size="small" sx={{width: 50}}>
                <HomeIcon color="primary"/>
            </IconButton>
            <S.Box>
                <Input/>
                <Button variant="contained" onClick={handleOpen}>Novo Fornecedor</Button>
            </S.Box>
            <DataGrid
                autoHeight={true}
                rows={fornecedores}
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
                    <S.TituloModal>Cadastro de Fornecedor</S.TituloModal>
                    <S.Form onSubmit={handleSubmit}>
                        <TextField label="Nome do Fornecedor" variant="outlined" required size="normal" onChange={e => setFornecedor(e.target.value)}/>
                        <TextField label="Email" variant="outlined" required size="normal" onChange={e => setEmail(e.target.value)}/>
                        <TextField label="CNPJ" variant="outlined" type="number" required size="normal" onChange={e => setCnpj(e.target.value)}/>
                        <TextField label="Telefone" variant="outlined" type="number" required size="normal" onChange={e => setTelefone(e.target.value)}/>
                        <Button variant="contained" onClick={handleSubmit}>Confirmar</Button>
                    </S.Form>
                </S.Modal>
            </Modal>
        </S.Container>
    )
}

export default Fornecedores