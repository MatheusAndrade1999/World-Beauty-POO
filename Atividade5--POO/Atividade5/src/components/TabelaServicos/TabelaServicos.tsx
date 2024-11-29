import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import './TabelaServicos.css';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nome', headerName: 'Nome do Serviço', width: 200 },
  { field: 'preco', headerName: 'Preço', width: 100 },
  { field: 'consumo', headerName: 'Consumo', width: 150 },
  { field: 'criado_em', headerName: 'Criado em', width: 180 },
];

const TabelaServicos: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedServico, setSelectedServico] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchServicos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/servicos');
      setRows(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/servicos/${id}`);
      alert('Serviço excluído com sucesso!');
      fetchServicos();
    } catch (error) {
      console.error('Erro ao excluir serviço:', error);
      alert('Erro ao excluir serviço. Tente novamente.');
    }
  };

  const handleEdit = (servico: any) => {
    setSelectedServico(servico);
    setModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:3000/servicos/${selectedServico.id}`, selectedServico);
      alert('Serviço atualizado com sucesso!');
      setModalOpen(false);
      fetchServicos();
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error);
      alert('Erro ao atualizar serviço. Tente novamente.');
    }
  };

  useEffect(() => {
    fetchServicos();
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
                  style={{ marginRight: '4px' }}
                  onClick={() => handleEdit(params.row)}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
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
          <h2>Editar Serviço</h2>
          <TextField
            label="Nome"
            name="nome"
            value={selectedServico?.nome || ''}
            onChange={(e) => setSelectedServico({ ...selectedServico, nome: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Preço"
            name="preco"
            value={selectedServico?.preco || ''}
            onChange={(e) => setSelectedServico({ ...selectedServico, preco: parseFloat(e.target.value) })}
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

export default TabelaServicos;
