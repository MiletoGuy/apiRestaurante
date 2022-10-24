import React, {useEffect, useState} from "react"
import * as S from './styled'
import {DataGrid} from '@mui/x-data-grid'
import {Autocomplete, Button, Input, TextField} from "@mui/material"
import axios from 'axios'
import Modal from '@mui/material/Modal'

const Home = () => {
    const [pedidos, setPedidos] = useState('')
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        alert("Submit formulário")
    }

    useEffect(() => {
        getPedidos();
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

    const produtos = [
        {label: 'Maça', id: 0},
        {label: 'Batata', id: 1},
        {label: 'Abacaxi', id: 2}
    ]


    return (
        <S.Container>
            <S.Box>
                <Input/>
                <Button variant="outlined" onClick={handleOpen}>Novo Pedido</Button>
            </S.Box>
            <DataGrid
                autoHeight={true}
                rows={pedidos}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
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
                            options={produtos} sx={{width: 200}}/>
                        <TextField label="Quantidade" variant="outlined" required size="normal" type="number"/>
                        <TextField label="Cliente" variant="outlined" required size="normal"/>

                    </S.Form>
                </S.Modal>
            </Modal>
        </S.Container>
    )
}

export default Home