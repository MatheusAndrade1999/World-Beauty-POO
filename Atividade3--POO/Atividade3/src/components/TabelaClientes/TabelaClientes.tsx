import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import './TabelaClientes.css';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nome', headerName: 'Nome', width: 150 },
  { field: 'nomeSocial', headerName: 'Nome Social', width: 150 },
  { field: 'genero', headerName: 'Gênero', width: 90 },
  { field: 'cpf', headerName: 'CPF', width: 130 },
  { field: 'rg', headerName: 'RG', width: 130 },
  { field: 'telefone', headerName: 'Telefone', width: 130 },
];

const rows = [
  { id: 1, nome: 'Tony Stark', nomeSocial: 'Iron Man', genero: 'M', cpf: '123.456.789-00', rg: '12.345.678-9', telefone: '(11) 91234-5678' },
  { id: 2, nome: 'Steve Rogers', nomeSocial: 'Captain America', genero: 'M', cpf: '234.567.890-01', rg: '23.456.789-0', telefone: '(11) 92345-6789' },
  { id: 3, nome: 'Thor Odinson', nomeSocial: 'Thor', genero: 'M', cpf: '345.678.901-02', rg: '34.567.890-1', telefone: '(11) 93456-7890' },
  { id: 4, nome: 'Bruce Banner', nomeSocial: 'Hulk', genero: 'M', cpf: '456.789.012-03', rg: '45.678.901-2', telefone: '(11) 94567-8901' },
  { id: 5, nome: 'Natasha Romanoff', nomeSocial: 'Black Widow', genero: 'F', cpf: '567.890.123-04', rg: '56.789.012-3', telefone: '(11) 95678-9012' },
  { id: 6, nome: 'Clint Barton', nomeSocial: 'Hawkeye', genero: 'M', cpf: '678.901.234-05', rg: '67.890.123-4', telefone: '(11) 96789-0123' },
  { id: 7, nome: 'Wanda Maximoff', nomeSocial: 'Scarlet Witch', genero: 'F', cpf: '789.012.345-06', rg: '78.901.234-5', telefone: '(11) 97890-1234' },
  { id: 8, nome: 'Peter Parker', nomeSocial: 'Spider-Man', genero: 'M', cpf: '890.123.456-07', rg: '89.012.345-6', telefone: '(11) 98901-2345' },
  { id: 9, nome: 'T\'Challa', nomeSocial: 'Black Panther', genero: 'M', cpf: '901.234.567-08', rg: '90.123.456-7', telefone: '(11) 99123-4567' },
];

const paginationModel = { page: 0, pageSize: 5 };

const TabelaClientes: React.FC = () => {
  return (
    <Paper className="table-container">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <Button className='Botao-Clientes' variant="contained" style={{ marginRight: '8px' }}>
          EXCLUIR
        </Button>
        <Button className='Botao-Clientes' variant="contained" >
          EDITAR
        </Button>
      </div>
    </Paper>
  );
};

export default TabelaClientes;
