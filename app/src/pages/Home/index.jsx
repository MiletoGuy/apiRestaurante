import React, {useEffect, useState} from "react"
import * as S from './styled'
import {DataGrid} from '@mui/x-data-grid'
import {Autocomplete, Button, Input, TextField} from "@mui/material"
import axios from 'axios'
import Modal from '@mui/material/Modal'

const Home = () => {
    const [pedidos, setPedidos] = useState('')
    const [clientes, setClientes] = useState('')
    const [produtos, setProdutos] = useState('')
    const [open, setOpen] = useState(false)
    const [nomesClientes, setNomesClientes] = useState([])
    const [nomesProdutos, setNomesProdutos] = useState([])
    const [produto, setProduto] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [cliente, setCliente] = useState('')

    const handleOpen = () => {
        setOpen(true)
        setNomesClientes(clientes.map(c => c.nome))
        setNomesProdutos(produtos.map(c => c.nome))
    }
    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        getPedidos()
        getClientes()
        getProdutos()
    }, [])


    const getPedidos = () => {
        axios.get('http://localhost:3001/pedidos', {
                headers: {
                    'x-access-token': window.sessionStorage.getItem('token')
                }
            }
        )
            .then(res => setPedidos(res.data.response.pedidos))
            .catch(err => console.log(err))
    }

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

    const handleSubmit = () => {
        alert("Novo pedido cadastrado\n" +
            "\nProduto: " + produto +
            "\nQuantidade: " + quantidade +
            "\nCliente: " + cliente
        )

        let prod = produtos.find(p => p.nome === produto)
        let cli = clientes.find(c => c.nome === cliente)

        axios.post('http://localhost:3001/pedidos',{
            quantidade: quantidade,
            id_produto: prod.id,
            id_cliente: cli.id,
            id_funcionario: window.sessionStorage.getItem('userId'),
            estado: 'ABERTO'

        }, {
            headers: {
                'x-access-token': window.sessionStorage.getItem('token')
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        handleClose()
        getPedidos()
    }


    const columns = [
        {field: 'id', headerName: 'ID', width: 90},
        {
            field: 'quantidade',
            type: 'number',
            headerName: 'Quantidade',
            width: 150,
        },
        {
            field: 'id_produto',
            type: 'number',
            headerName: 'Produto',
            width: 150,
        },
        {
            field: 'id_cliente',
            headerName: 'Cliente',
            type: 'number',
            width: 110,
        },
        {
            field: 'id_funcionario',
            headerName: 'Funcionario',
            type: 'number',
            width: 160,
        },
        {
            field: 'estado',
            headerName: 'Estado',
            width: 160,
        },
    ];


    return (
        <S.Container>
            <S.Box>
                <Input/>
                <Button variant="contained" onClick={handleOpen}>Novo Pedido</Button>
            </S.Box>
            <DataGrid
                autoHeight={true}
                rows={pedidos}
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
                    <S.Titulo>Cadastro de pedido</S.Titulo>
                    <S.Form onSubmit={handleSubmit}>
                        <Autocomplete
                            renderInput={(params) => <TextField {...params} label="Produto"/>}
                            options={nomesProdutos} sx={{width: 200}} inputValue={produto}
                            onChange={(event,newValue) => {
                                if(newValue) setProduto(newValue)
                                else setProduto('')
                            }}
                            onInputChange={(event, newInputValue) => {
                                if(newInputValue) setProduto(newInputValue)
                                else setProduto('')
                            }}
                        />
                        <TextField label="Quantidade" variant="outlined" required size="normal" type="number" onChange={e => setQuantidade(e.target.value)}/>
                        <Autocomplete
                            renderInput={(params) => <TextField {...params} label="Cliente"/>}
                            options={nomesClientes} sx={{width: 200}} inputValue={cliente}
                            onChange={(event,newValue) => {
                                if(newValue) setCliente(newValue)
                                else setCliente('')
                            }}
                            onInputChange={(event, newInputValue) => {
                                if(newInputValue) setCliente(newInputValue)
                                else setCliente('')
                            }}
                        />
                        <Button variant="contained" onClick={handleSubmit}>Confirmar</Button>
                    </S.Form>
                </S.Modal>
            </Modal>
        </S.Container>
    )
}

export default Home