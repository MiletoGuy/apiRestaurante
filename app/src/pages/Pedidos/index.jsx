import React, {useEffect, useState} from "react"
import * as S from './styled'
import {DataGrid} from '@mui/x-data-grid'
import {Autocomplete, Button, IconButton, Input, TextField} from "@mui/material"
import axios from 'axios'
import Modal from '@mui/material/Modal'
import {useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

const Pedidos = () => {
    const [pedidos, setPedidos] = useState('')
    const [clientes, setClientes] = useState('')
    const [produtos, setProdutos] = useState('')
    const [open, setOpen] = useState(false)
    const [nomesClientes, setNomesClientes] = useState([])
    const [nomesProdutos, setNomesProdutos] = useState([])
    const [produto, setProduto] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [cliente, setCliente] = useState('')
    const navigate = useNavigate()

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
        let prod = produtos.find(p => p.nome === produto)
        let cli = clientes.find(c => c.nome === cliente)
        let novoEstoque = parseInt(prod.emEstoque - quantidade)
        if (prod.emEstoque >= quantidade) {

            axios.patch('http://localhost:3001/produtos', {
                id_produto: prod.id,
                nome: prod.nome,
                valor: prod.valor,
                emEstoque: novoEstoque,
                fornecedor: prod.fornecedor
            }, {
                headers: {
                    'x-access-token': window.sessionStorage.getItem('token')
                }
            })
                .then(res => console.log(res))
                .catch(err => console.log(err))

            axios.post('http://localhost:3001/pedidos', {
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
            document.location.reload()

            alert("Novo pedido cadastrado\n" +
                "\nProduto: " + produto +
                "\nQuantidade: " + quantidade +
                "\nCliente: " + cliente
            )
        } else {
            alert("Estoque insuficiente")
        }


    }

    const fechaPedido = (id_pedido) => {
        let ped = pedidos.find(p => p.id === id_pedido)

        axios.patch('http://localhost:3001/pedidos', {
            id_pedido: id_pedido,
            quantidade: ped.quantidade,
            id_produto: ped.id_produto,
            id_cliente: ped.id_cliente,
            id_funcionario: ped.id_funcionario,
            estado: 'FECHADO'

        }, {
            headers: {
                'x-access-token': window.sessionStorage.getItem('token')
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        getPedidos()
        document.location.reload()
    }

    const renderDetailsButton = (params) => {
        if (params.row.estado === "ABERTO") {
            return (
                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => {
                        fechaPedido(params.row.id)
                    }}
                >
                    Fechar Pedido
                </Button>
            )
        }
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
        {
            field: 'op',
            headerName: '',
            width: 150,
            renderCell: renderDetailsButton,
            disableClickEventBubbling: true,
        }
    ];

    const navHome = () => {
        navigate(`/home`)
    }

    return (
        <S.Container>
            <S.Titulo>Pedidos</S.Titulo>
            <IconButton onClick={navHome} size="small" sx={{width: 50}}>
                <HomeIcon color="primary"/>
            </IconButton>
            <S.Box>
                <Input placeholder="Filtro"/>
                <Button variant="contained" onClick={handleOpen}>Novo Pedido</Button>
            </S.Box>
            <DataGrid
                autoHeight={true}
                rows={pedidos}
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
                    <S.TituloModal>Cadastro de pedido</S.TituloModal>
                    <S.Form onSubmit={handleSubmit}>
                        <Autocomplete
                            renderInput={(params) => <TextField {...params} label="Produto"/>}
                            options={nomesProdutos} sx={{width: 200}} inputValue={produto}
                            onChange={(event, newValue) => {
                                if (newValue) setProduto(newValue)
                                else setProduto('')
                            }}
                            onInputChange={(event, newInputValue) => {
                                if (newInputValue) setProduto(newInputValue)
                                else setProduto('')
                            }}
                        />
                        <TextField label="Quantidade" variant="outlined" required size="normal" type="number"
                                   onChange={e => setQuantidade(e.target.value)}/>
                        <Autocomplete
                            renderInput={(params) => <TextField {...params} label="Cliente"/>}
                            options={nomesClientes} sx={{width: 200}} inputValue={cliente}
                            onChange={(event, newValue) => {
                                if (newValue) setCliente(newValue)
                                else setCliente('')
                            }}
                            onInputChange={(event, newInputValue) => {
                                if (newInputValue) setCliente(newInputValue)
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

export default Pedidos