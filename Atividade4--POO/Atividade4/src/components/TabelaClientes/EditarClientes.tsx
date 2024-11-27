import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { editarCliente } from './ClientesBack'; // Atualize o caminho correto

const EditarCliente = ({ open, setOpen, cliente, fetchUsers }: any) => {
  const [formData, setFormData] = useState(cliente || {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await editarCliente(formData);
      alert('Cliente atualizado com sucesso!');
      setOpen(false);
      fetchUsers(); // Atualiza a tabela após a edição
    } catch (error) {
      alert('Erro ao editar cliente.');
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={{ ...modalStyle }}>
        <h2>Editar Cliente</h2>
        <TextField
          label="Nome"
          name="nome"
          value={formData.nome || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nome Social"
          name="nomeSocial"
          value={formData.nomeSocial || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {/* Adicione outros campos como CPF, telefone, etc., conforme necessário */}
        <Button variant="contained" onClick={handleSave}>
          Salvar
        </Button>
        <Button variant="outlined" onClick={() => setOpen(false)} style={{ marginLeft: '8px' }}>
          Cancelar
        </Button>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default EditarCliente;
