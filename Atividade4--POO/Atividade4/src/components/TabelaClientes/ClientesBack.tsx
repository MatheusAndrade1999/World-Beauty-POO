import axios from 'axios';

const API_BASE_URL = 'http://localhost:32832';

// Listar clientes com dados completos
export async function listarClientes() {
  try {
    const response = await axios.get(`${API_BASE_URL}/clientes`, { validateStatus: false });
    
    return response.data.map((cliente: any) => ({
      id: cliente.id,
      nome: cliente.nome,
      sobreNome: cliente.sobrenome, // Alterando para sobreNome
      endereco: cliente.endereco || {}, // Endereço completo
      telefones: cliente.telefones || [], // Lista de telefones
      email: cliente.email || '', // E-mail
      informacoesAdicionais: cliente.informacoesAdicionais || '', // Informações adicionais
    }));
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    throw error;
  }
}

// Excluir cliente
export async function deletarCliente(clienteId: number) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/cliente/excluir`, {
      data: { id: clienteId },
      validateStatus: false,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    throw error;
  }
}

// Atualizar cliente
export async function atualizarCliente(cliente: any) {
  try {
    // Atualizando os dados do cliente, incluindo telefone, endereço, etc.
    const response = await axios.put(`${API_BASE_URL}/cliente/atualizar`, cliente, { validateStatus: false });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    throw error;
  }
}
