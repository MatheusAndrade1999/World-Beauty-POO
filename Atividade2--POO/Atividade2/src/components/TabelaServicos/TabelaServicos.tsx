import React, { Component } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import './TabelaServicos.css'; // Importando o CSS
import Button from '@mui/material/Button';

const columns: GridColDef[] = [
    { field: 'nome', headerName: 'Nome', width: 150 },
    { field: 'preco', headerName: 'Preço', width: 130 },
];

const rows = [
    { id: 1, nome: 'Corte de Cabelo', preco: 'R$ 30,00' },
    { id: 2, nome: 'Pintura', preco: 'R$ 120,00' },
    { id: 3, nome: 'Escova', preco: 'R$ 40,00' },
    { id: 4, nome: 'Hidratação', preco: 'R$ 70,00' },
    { id: 5, nome: 'Progressiva', preco: 'R$ 200,00' },
];

const paginationModel = { page: 0, pageSize: 5 };

class TabelaServicos extends Component {
    render() {
        return (
            <Paper className="table-container-servicos">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                    <Button className='Botao-Servicos' variant="contained" style={{ marginRight: '8px' }}>
                        EXCLUIR
                    </Button>
                    <Button className='Botao-Servicos' variant="contained">
                        EDITAR
                    </Button>
                </div>
            </Paper>
        );
    }
}

export default TabelaServicos;
