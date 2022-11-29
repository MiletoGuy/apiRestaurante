import React, {useEffect, useState} from "react"
import * as S from './styled'
import {DataGrid} from '@mui/x-data-grid'
import {Button, TextField} from "@mui/material"
import axios from 'axios'
import Modal from '@mui/material/Modal'
import {useNavigate} from "react-router-dom";

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
            headerName: 'NOME',
            width: 150,
        },
        {
            field: 'email',
            headerName: 'EMAIL',
            width: 250,
        },
        {
            field: 'cnpj',
            headerName: 'CNPJ',
            width: 140,
        },
        {
            field: 'telefone',
            headerName: 'TELEFONE',
            width: 160,
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
                        sx={{width: 190}}>Novo Fornecedor</Button>
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
                    <S.Titulo>Cadastro de Fornecedor</S.Titulo>
                    <S.Form onSubmit={handleSubmit}>
                        <TextField label="Nome do Fornecedor" variant="outlined" required size="normal" onChange={e => setFornecedor(e.target.value)}/>
                        <TextField label="Email" variant="outlined" required size="normal" onChange={e => setEmail(e.target.value)}/>
                        <TextField label="CNPJ" variant="outlined" type="number" required size="normal" onChange={e => setCnpj(e.target.value)}/>
                        <TextField label="Telefone" variant="outlined" type="number" required size="normal" onChange={e => setTelefone(e.target.value)}/>
                        <Button variant="outlined" onClick={handleSubmit}>Confirmar</Button>
                    </S.Form>
                </S.Modal>
            </Modal>
        </S.Container>
    )
}

export default Fornecedores