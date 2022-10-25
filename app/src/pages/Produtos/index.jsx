import React, {useEffect, useState} from "react"
import * as S from './styled'
import {DataGrid} from '@mui/x-data-grid'
import {Autocomplete, Button, Input, TextField} from "@mui/material"
import axios from 'axios'
import Modal from '@mui/material/Modal'
import {useNavigate} from "react-router-dom";

const Pedidos = () => {
    const [produtos, setProdutos] = useState('')
    const [fornecedores, setFornecedores] = useState('')
    const [open, setOpen] = useState(false)
    const [produto, setProduto] = useState('')
    const [fornecedor, setFornecedor] = useState('')
    const [nomesFornecedores, setNomesFornecedores] = useState('')
    const [valor, setValor] = useState('')
    const navigate = useNavigate()

    const handleOpen = () => {
        setOpen(true)
        setNomesFornecedores(fornecedores.map(c => c.nome))
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        getProdutos()
        getFornecedores()
    }, [])

    const getProdutos = () => {
        axios.get('http://localhost:3001/produtos', {
                headers: {
                    'x-access-token': window.sessionStorage.getItem('token')
                }
            }
        )
            .then(res => setProdutos(res.data.response.produtos))
            .catch(err => console.log(err))
    }

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
        alert("Novo Produto cadastrado\n" +
            "\nProduto: " + produto +
            "\nValor: " + valor +
            "\nFornecedor: " + fornecedor
        )

        let frn = fornecedores.find(c => c.nome === fornecedor)

        axios.post('http://localhost:3001/produtos',{
            nome: produto,
            valor: valor,
            emEstoque: 0,
            fornecedor: frn.id
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
            headerName: 'Nome do Produto',
            width: 150,
        },
        {
            field: 'valor',
            type: 'number',
            headerName: 'Valor',
            width: 80,
        },
        {
            field: 'emEstoque',
            type: 'number',
            headerName: 'Em Estoque',
            width: 120,
        },
        {
            field: 'fornecedor',
            headerName: 'Fornecedor',
            type: 'number',
            width: 110,
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
                <Button variant="contained" onClick={handleOpen}>Novo Produto</Button>
            </S.Box>
            <DataGrid
                autoHeight={true}
                rows={produtos}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
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
                    <S.Titulo>Cadastro de Produtos</S.Titulo>
                    <S.Form onSubmit={handleSubmit}>
                        <TextField label="Nome do Produto" variant="outlined" required size="normal" onChange={e => setProduto(e.target.value)}/>
                        <TextField label="Valor" variant="outlined" required size="normal" type="number" onChange={e => setValor(e.target.value)}/>
                        <Autocomplete
                            renderInput={(params) => <TextField {...params} label="Fornecedor"/>}
                            options={nomesFornecedores} sx={{width: 300}} inputValue={fornecedor}
                            onChange={(event,newValue) => {
                                if(newValue) setFornecedor(newValue)
                                else setFornecedor('')
                            }}
                            onInputChange={(event, newInputValue) => {
                                if(newInputValue) setFornecedor(newInputValue)
                                else setFornecedor('')
                            }}
                        />
                        <Button variant="contained" onClick={handleSubmit}>Confirmar</Button>
                    </S.Form>
                </S.Modal>
            </Modal>
        </S.Container>
    )
}

export default Pedidos