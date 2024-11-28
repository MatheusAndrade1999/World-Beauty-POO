// TabelaServicos.tsx
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';
import './TabelaServicos.css'; 


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nome', headerName: 'Nome', width: 150 },
    { field: 'preco', headerName: 'Preço', width: 130 },
    { field: 'consumo', headerName: 'Consumo', width: 120 },
];


const TabelaServicos: React.FC = () => {
    const [servicos, setServicos] = useState([]); 
    const [loading, setLoading] = useState(true); 

   
    const fetchServicos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/servicos'); 
            const servicosData = response.data.map((servico: any) => ({
                id: servico.id,
                nome: servico.nome,
                preco: `R$ ${(servico.preco / 100).toFixed(2)}`, 
                consumo: servico.consumo,
            }));
            setServicos(servicosData);
        } catch (error) {
            console.error('Erro ao buscar serviços:', error);
        } finally {
            setLoading(false);
        }
    };

  
    useEffect(() => {
        fetchServicos();
    }, []);

    return (
        <Paper className="table-container-servicos">
            <DataGrid
                rows={servicos}
                columns={columns}
                loading={loading} 
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <Button className="Botao-Servicos" variant="contained" style={{ marginRight: '8px' }}>
                    EXCLUIR
                </Button>
                <Button className="Botao-Servicos" variant="contained">
                    EDITAR
                </Button>
            </div>
        </Paper>
    );
};

export default TabelaServicos;
