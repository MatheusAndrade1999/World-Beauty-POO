// TabelaProduto.tsx
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import './TabelaProduto.css'; // Importando o CSS
import Button from '@mui/material/Button';

const columns: GridColDef[] = [
    { field: 'nome', headerName: 'Nome', width: 150 },
    { field: 'preco', headerName: 'Preço', width: 130 },
];

const rows = [
    { id: 1, nome: 'Shampoo', preco: 'R$ 6,00' },
    { id: 2, nome: 'Pomada', preco: 'R$ 50,00' },
    { id: 3, nome: 'Condicionador', preco: 'R$ 6,00' },
    { id: 4, nome: 'Sabonete 25 em 1', preco: 'R$ 25,00' },
    { id: 5, nome: 'Gel', preco: 'R$ 30,00' },
];

const paginationModel = { page: 0, pageSize: 5 };

const TabelaProduto: React.FC = () => {
    return (
        <Paper className="table-container-produtos">
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <Button className='Botao-Produtos' variant="contained" style={{ marginRight: '8px' }}>
          EXCLUIR
        </Button>
        <Button className='Botao-Produtos' variant="contained" >
          EDITAR
        </Button>
      </div>
        </Paper>
    );
};

export default TabelaProduto;
