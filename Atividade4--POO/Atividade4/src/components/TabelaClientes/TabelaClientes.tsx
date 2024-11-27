import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { listarClientes, deletarCliente, atualizarCliente } from './ClientesBack';
import './TabelaClientes.css';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nome', headerName: 'Nome', width: 150 },
  { field: 'sobrenome', headerName: 'Sobrenome', width: 150 },  // Corrigido para 'sobrenome'
  { 
    field: 'endereco', 
    headerName: 'Endereço', 
    width: 300,
    renderCell: (params) => {
      const endereco = params.row.endereco;
      if (endereco) {
        return `${endereco.rua}, ${endereco.numero}, ${endereco.bairro} - ${endereco.cidade}, ${endereco.estado} (${endereco.codigoPostal})`;
      }
      return 'Endereço não disponível';
    }
  },
  { 
    field: 'telefones', 
    headerName: 'Telefone', 
    width: 180,
    renderCell: (params) => {
      const telefones = params.row.telefones;
      if (telefones && telefones.length > 0) {
        return telefones.map((tel: any) => `${tel.ddd} ${tel.numero}`).join(', ');
      }
      return 'Telefone não disponível';
    }
  },
  { 
    field: 'email', 
    headerName: 'E-mail', 
    width: 200,
    renderCell: (params) => {
      return params.row.email ? params.row.email : 'E-mail não disponível';
    }
  },
  { 
    field: 'informacoesAdicionais', 
    headerName: 'Informações Adicionais', 
    width: 250,
    renderCell: (params) => {
      return params.row.endereco?.informacoesAdicionais || 'Sem informações adicionais';
    }
  },
];

const TabelaClientes: React.FC = () => {
  const [rows, setRows] = useState([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const clientes = await listarClientes();
      console.log(clientes);  // Verificar a estrutura dos dados
      if (clientes && Array.isArray(clientes)) {
        setRows(clientes);
      } else {
        console.error('Dados inválidos recebidos:', clientes);
        alert('Erro ao carregar a lista de clientes.');
      }
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      alert('Erro ao carregar a lista de clientes.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      alert('Selecione pelo menos um cliente para excluir!');
      return;
    }
    if (confirm('Deseja realmente excluir o(s) cliente(s) selecionado(s)?')) {
      try {
        for (const id of selectedIds) {
          await deletarCliente(id);
        }
        alert('Cliente(s) excluído(s) com sucesso!');
        setRows((prevRows) => prevRows.filter((row) => !selectedIds.includes(row.id)));
        setSelectedIds([]);
      } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        alert('Erro ao excluir cliente(s).');
      }
    }
  };

  const handleUpdate = () => {
    if (selectedIds.length !== 1) {
      alert('Selecione apenas um cliente para atualizar!');
      return;
    }
    const cliente = rows.find((row) => row.id === selectedIds[0]);
    setSelectedClient(cliente);
    setModalOpen(true);
  };

  const handleSaveUpdate = async () => {
    if (!selectedClient) {
      console.error('Não há cliente selecionado para atualização.');
      return;
    }

    try {
      const response = await atualizarCliente(selectedClient);
      if (response) {
        alert('Cliente atualizado com sucesso!');
        setRows((prevRows) =>
          prevRows.map((row) => (row.id === selectedClient.id ? selectedClient : row))
        );
        setModalOpen(false);
        setSelectedClient(null);
      } else {
        console.error('Erro ao atualizar o cliente: resposta inválida');
        alert('Erro ao atualizar cliente.');
      }
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      alert('Erro ao atualizar cliente.');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setSelectedClient((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelection = (ids: any) => {
    setSelectedIds(ids);
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <Paper className="table-container">
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={(ids) => handleSelection(ids)}
        loading={loading}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <Button
          className="Botao-Clientes"
          variant="contained"
          style={{ marginRight: '8px' }}
          onClick={handleDelete}
        >
          EXCLUIR
        </Button>
        <Button className="Botao-Clientes" variant="contained" onClick={handleUpdate}>
          ATUALIZAR
        </Button>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="modal-container">
          <h2>Atualizar Cliente</h2>
          {selectedClient && (
            <>
              <TextField
                label="Nome"
                value={selectedClient.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Sobrenome"
                value={selectedClient.sobrenome}  // Corrigido para 'sobrenome'
                onChange={(e) => handleInputChange('sobrenome', e.target.value)}  // Corrigido para 'sobrenome'
                fullWidth
                margin="normal"
              />
              <TextField
                label="E-mail"
                value={selectedClient.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                fullWidth
                margin="normal"
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <Button
                  variant="contained"
                  style={{ marginRight: '8px' }}
                  onClick={handleSaveUpdate}
                >
                  Salvar
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setModalOpen(false);
                    setSelectedClient(null);
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </Paper>
  );
};

export default TabelaClientes;
