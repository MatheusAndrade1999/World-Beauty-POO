import axios from 'axios';

export async function cadastrarCliente(cliente: any) {
    try {
        const response = await axios.post('http://localhost:32832/cliente/cadastrar', {
            nome: cliente.nome,
            sobreNome: cliente.sobreNome || null, // Garantir que sobrenome seja null caso não exista
            email: cliente.email || null, // Garantir que email seja null caso não exista
            endereco: {
                estado: cliente.endereco.estado,
                cidade: cliente.endereco.cidade,
                bairro: cliente.endereco.bairro,
                rua: cliente.endereco.rua,
                numero: cliente.endereco.numero,
                codigoPostal: cliente.endereco.codigoPostal,
                informacoesAdicionais: cliente.endereco.informacoesAdicionais,
            },
            telefones: cliente.telefones.map((telefone: any) => ({
                ddd: telefone.ddd,
                numero: telefone.numero,
            })),
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        throw error;
    }
}
