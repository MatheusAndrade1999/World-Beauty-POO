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
  { field: 'sobrenome', headerName: 'Sobrenome', width: 150 },
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
    renderCell: (params) => params.row.email || 'E-mail não disponível'
  },
  { 
    field: 'informacoesAdicionais', 
    headerName: 'Informações Adicionais', 
    width: 250,
    renderCell: (params) => params.row.endereco?.informacoesAdicionais || 'Sem informações adicionais'
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
      if (clientes && Array.isArray(clientes)) {
        setRows(clientes);
      } else {
        alert('Erro ao carregar a lista de clientes.');
      }
    } catch (error) {
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
      } catch {
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
    if (!selectedClient) return;

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
        alert('Erro ao atualizar cliente.');
      }
    } catch {
      alert('Erro ao atualizar cliente.');
    }
  };

  const handleInputChange = (field: string, value: any) => {
    const fields = field.split('.');
    setSelectedClient((prev: any) => {
      const updatedClient = { ...prev };
      let current = updatedClient;
      for (let i = 0; i < fields.length - 1; i++) {
        current = current[fields[i]] = current[fields[i]] || {};
      }
      current[fields[fields.length - 1]] = value;
      return updatedClient;
    });
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
                value={selectedClient.sobrenome}
                onChange={(e) => handleInputChange('sobrenome', e.target.value)}
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
              <h3>Endereço</h3>
              <TextField
                label="Rua"
                value={selectedClient.endereco?.rua || ''}
                onChange={(e) => handleInputChange('endereco.rua', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Número"
                value={selectedClient.endereco?.numero || ''}
                onChange={(e) => handleInputChange('endereco.numero', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Bairro"
                value={selectedClient.endereco?.bairro || ''}
                onChange={(e) => handleInputChange('endereco.bairro', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Cidade"
                value={selectedClient.endereco?.cidade || ''}
                onChange={(e) => handleInputChange('endereco.cidade', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Estado"
                value={selectedClient.endereco?.estado || ''}
                onChange={(e) => handleInputChange('endereco.estado', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Código Postal"
                value={selectedClient.endereco?.codigoPostal || ''}
                onChange={(e) => handleInputChange('endereco.codigoPostal', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Informações Adicionais"
                value={selectedClient.endereco?.informacoesAdicionais || ''}
                onChange={(e) => handleInputChange('endereco.informacoesAdicionais', e.target.value)}
                fullWidth
                margin="normal"
              />
              <h3>Telefones</h3>
              {selectedClient.telefones?.map((telefone: any, index: number) => (
                <div key={index}>
                  <TextField
                    label={`DDD ${index + 1}`}
                    value={telefone.ddd || ''}
                    onChange={(e) =>
                      handleInputChange(`telefones[${index}].ddd`, e.target.value)
                    }
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label={`Número ${index + 1}`}
                    value={telefone.numero || ''}
                    onChange={(e) =>
                      handleInputChange(`telefones[${index}].numero`, e.target.value)
                    }
                    fullWidth
                    margin="normal"
                  />
                </div>
              ))}
            </>
          )}
          <div className="modal-buttons">
            <Button variant="contained" onClick={handleSaveUpdate}>
              Salvar
            </Button>
            <Button variant="outlined" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </Paper>
  );
};

export default TabelaClientes;
