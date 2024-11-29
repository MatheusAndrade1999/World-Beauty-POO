import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import './TabelaProduto.css';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nome', headerName: 'Nome', width: 150 },
  { field: 'preco', headerName: 'Preço', width: 100 },
  { field: 'quantidade', headerName: 'Quantidade', width: 100 },
  { field: 'criado_em', headerName: 'Criado em', width: 180, valueFormatter: (params) => new Date(params.value).toLocaleString() },
];

const TabelaProduto: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProduto, setSelectedProduto] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/produtos');
      setRows(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/produtos/${id}`);
      alert('Produto excluído com sucesso!');
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      alert('Erro ao excluir produto. Tente novamente.');
    }
  };

  const handleEdit = (produto: any) => {
    setSelectedProduto(produto);
    setModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:3000/produtos/${selectedProduto.id}`, selectedProduto);
      alert('Produto atualizado com sucesso!');
      setModalOpen(false);
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      alert('Erro ao atualizar produto. Tente novamente.');
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <Paper className="table-container">
      <DataGrid
        rows={rows}
        columns={[
          ...columns,
          {
            field: 'actions',
            headerName: 'Ações',
            width: 200,
            renderCell: (params: GridRowParams) => (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: '4px', fontSize: '0.8rem', width: '75px' }}
                  onClick={() => handleEdit(params.row)}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ fontSize: '0.8rem', width: '75px' }}
                  onClick={() => handleDelete(params.row.id)}
                >
                  Excluir
                </Button>
              </>
            ),
          },
        ]}
        loading={loading}
        initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />

      {/* Modal para edição */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="modal-container">
          <h2>Editar Produto</h2>
          <TextField
            label="Nome"
            name="nome"
            value={selectedProduto?.nome || ''}
            onChange={(e) => setSelectedProduto({ ...selectedProduto, nome: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Preço"
            name="preco"
            value={selectedProduto?.preco || ''}
            onChange={(e) => setSelectedProduto({ ...selectedProduto, preco: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Quantidade"
            name="quantidade"
            value={selectedProduto?.quantidade || ''}
            onChange={(e) => setSelectedProduto({ ...selectedProduto, quantidade: e.target.value })}
            fullWidth
            margin="normal"
          />
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSaveEdit} 
              style={{ marginRight: '10px' }}
            >
              Salvar
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </Paper>
  );
};

export default TabelaProduto;
