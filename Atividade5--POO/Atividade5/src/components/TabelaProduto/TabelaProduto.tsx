import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import './TabelaProduto.css';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  consumo: number;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nome', headerName: 'Nome', width: 150 },
  { field: 'preco', headerName: 'Preço', width: 130 },
  { field: 'quantidade', headerName: 'Quantidade', width: 120 },
  { field: 'consumo', headerName: 'Consumo', width: 120 },
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
            padding: '4px 10px',
            fontSize: '0.8rem',
            width: '75px',
            minWidth: 'auto',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
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
            padding: '4px 10px',
            fontSize: '0.8rem',
            width: '75px',
            minWidth: 'auto',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
          onClick={() => handleDelete(params.row.id)}
        >
          Excluir
        </Button>
      </>
    ),
  },
];

const TabelaProduto: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/produtos');
      setProdutos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3000/produtos/${id}`);
      if (response.status === 200) {
        alert('Produto excluído com sucesso!');
        fetchProdutos(); // Recarregar a lista de produtos após a exclusão
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      alert('Erro ao excluir produto. Tente novamente.');
    }
  };

  const handleEdit = (produto: Produto) => {
    setSelectedProduto(produto);
    setModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedProduto) return;

    // Validação simples antes de enviar
    if (
      !selectedProduto.nome ||
      isNaN(selectedProduto.preco) ||
      isNaN(selectedProduto.quantidade) ||
      isNaN(selectedProduto.consumo)
    ) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/produtos/${selectedProduto.id}`, selectedProduto);
      if (response.status === 200) {
        alert('Produto atualizado com sucesso!');
        setModalOpen(false);
        fetchProdutos(); // Recarregar a lista de produtos após a edição
      }
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
        rows={produtos}
        columns={columns}
        loading={loading}
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
            onChange={(e) =>
              setSelectedProduto({ ...selectedProduto!, nome: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Preço"
            name="preco"
            value={selectedProduto?.preco || ''}
            onChange={(e) =>
              setSelectedProduto({ ...selectedProduto!, preco: Number(e.target.value) })
            }
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Quantidade"
            name="quantidade"
            value={selectedProduto?.quantidade || ''}
            onChange={(e) =>
              setSelectedProduto({ ...selectedProduto!, quantidade: Number(e.target.value) })
            }
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Consumo"
            name="consumo"
            value={selectedProduto?.consumo || ''}
            onChange={(e) =>
              setSelectedProduto({ ...selectedProduto!, consumo: Number(e.target.value) })
            }
            fullWidth
            margin="normal"
            type="number"
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
