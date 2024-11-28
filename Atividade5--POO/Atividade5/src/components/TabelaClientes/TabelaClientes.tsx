import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import './TabelaClientes.css';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nome', headerName: 'Nome', width: 150 },
  { field: 'nomeSocial', headerName: 'Nome Social', width: 150 },
  { field: 'genero', headerName: 'Gênero', width: 90 },
  { field: 'CPF', headerName: 'CPF', width: 130 },
  { field: 'RG', headerName: 'RG', width: 130 },
  { field: 'telefone', headerName: 'Telefone', width: 130 },
];

const TabelaClientes: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCliente, setSelectedCliente] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/clientes');
      setRows(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/clientes/${id}`);
      alert('Cliente excluído com sucesso!');
      fetchClientes();
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      alert('Erro ao excluir cliente. Tente novamente.');
    }
  };

  const handleEdit = (cliente: any) => {
    setSelectedCliente(cliente);
    setModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:3000/clientes/${selectedCliente.id}`, selectedCliente);
      alert('Cliente atualizado com sucesso!');
      setModalOpen(false);
      fetchClientes();
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      alert('Erro ao atualizar cliente. Tente novamente.');
    }
  };

  useEffect(() => {
    fetchClientes();
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
                  style={{
                    marginRight: '4px',
                    padding: '4px 10px', // Ajustando o padding para controlar a largura
                    fontSize: '0.8rem', // Mantendo a fonte menor
                    width: '75px', // Definindo a largura máxima do botão
                    minWidth: 'auto', // Removendo a largura mínima para não forçar o botão a ficar maior
                    textOverflow: 'ellipsis', // Tratamento para o texto não sair do botão
                    whiteSpace: 'nowrap', // Garantindo que o texto não quebre
                    overflow: 'hidden', // Evita que o texto ultrapasse os limites do botão
                  }}
                  onClick={() => handleEdit(params.row)}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    marginRight: '4px',
                    padding: '4px 10px', // Ajustando o padding para controlar a largura
                    fontSize: '0.8rem', // Mantendo a fonte menor
                    width: '75px', // Definindo a largura máxima do botão
                    minWidth: 'auto', // Removendo a largura mínima para não forçar o botão a ficar maior
                    textOverflow: 'ellipsis', // Tratamento para o texto não sair do botão
                    whiteSpace: 'nowrap', // Garantindo que o texto não quebre
                    overflow: 'hidden', // Evita que o texto ultrapasse os limites do botão
                  }}
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
          <h2>Editar Cliente</h2>
          <TextField
            label="Nome"
            name="nome"
            value={selectedCliente?.nome || ''}
            onChange={(e) => setSelectedCliente({ ...selectedCliente, nome: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Nome Social"
            name="nomeSocial"
            value={selectedCliente?.nomeSocial || ''}
            onChange={(e) => setSelectedCliente({ ...selectedCliente, nomeSocial: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Gênero"
            name="genero"
            value={selectedCliente?.genero || ''}
            onChange={(e) => setSelectedCliente({ ...selectedCliente, genero: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="CPF"
            name="CPF"
            value={selectedCliente?.CPF || ''}
            onChange={(e) => setSelectedCliente({ ...selectedCliente, CPF: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="RG"
            name="RG"
            value={selectedCliente?.RG || ''}
            onChange={(e) => setSelectedCliente({ ...selectedCliente, RG: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Telefone"
            name="telefone"
            value={selectedCliente?.telefone || ''}
            onChange={(e) => setSelectedCliente({ ...selectedCliente, telefone: e.target.value })}
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

export default TabelaClientes;
