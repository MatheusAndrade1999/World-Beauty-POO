import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import './FormularioCadastro.css';
import { cadastrarCliente } from './CadastroCliente'; // Import da função de integração

interface Telefone {
    ddd: string;
    numero: string;
}

interface Endereco {
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    codigoPostal: string;
    informacoesAdicionais: string;
}

interface Cadastro {
    nome: string;
    sobreNome: string;
    email: string;
    endereco: Endereco;
    telefones: Telefone[];
}

const FormularioCadastro: React.FC = () => {
    const [cadastro, setCadastro] = useState<Cadastro>({
        nome: '',
        sobreNome: '',
        email: '',
        endereco: {
            estado: '',
            cidade: '',
            bairro: '',
            rua: '',
            numero: '',
            codigoPostal: '',
            informacoesAdicionais: '',
        },
        telefones: [{ ddd: '', numero: '' }],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCadastro(prev => ({ ...prev, [name]: value }));
    };

    const handleTelefoneChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const telefones = [...cadastro.telefones];
        telefones[index] = { ...telefones[index], [name]: value };
        setCadastro(prev => ({ ...prev, telefones }));
    };

    const handleSubmit = async () => {
        try {
            const response = await cadastrarCliente({
                nome: cadastro.nome,
                sobreNome: cadastro.sobreNome || null, // Enviar null se sobrenome não for fornecido
                email: cadastro.email || null, // Enviar null se email não for fornecido
                endereco: cadastro.endereco,
                telefones: cadastro.telefones,
            });
            alert('Cadastro realizado com sucesso!');
            console.log(response);

            // Limpar formulário
            setCadastro({
                nome: '',
                sobreNome: '',
                email: '',
                endereco: {
                    estado: '',
                    cidade: '',
                    bairro: '',
                    rua: '',
                    numero: '',
                    codigoPostal: '',
                    informacoesAdicionais: '',
                },
                telefones: [{ ddd: '', numero: '' }],
            });
        } catch (error) {
            alert('Erro ao cadastrar cliente!');
        }
    };

    return (
        <Paper className="form-container">
            <h2>Cadastrar Cliente</h2>
            <TextField
                label="Nome"
                fullWidth
                variant="outlined"
                name="nome"
                value={cadastro.nome}
                onChange={handleChange}
                style={{ marginBottom: '16px' }}
            />
            <TextField
                label="Sobrenome"
                fullWidth
                variant="outlined"
                name="sobreNome"
                value={cadastro.sobreNome}
                onChange={handleChange}
                style={{ marginBottom: '16px' }}
            />
            <TextField
                label="Email"
                fullWidth
                variant="outlined"
                name="email"
                value={cadastro.email}
                onChange={handleChange}
                style={{ marginBottom: '16px' }}
            />
            <h3>Endereço</h3>
            <TextField
                label="Estado"
                fullWidth
                variant="outlined"
                name="estado"
                value={cadastro.endereco.estado}
                onChange={(e) => setCadastro({ ...cadastro, endereco: { ...cadastro.endereco, estado: e.target.value } })}
                style={{ marginBottom: '16px' }}
            />
            <TextField
                label="Cidade"
                fullWidth
                variant="outlined"
                name="cidade"
                value={cadastro.endereco.cidade}
                onChange={(e) => setCadastro({ ...cadastro, endereco: { ...cadastro.endereco, cidade: e.target.value } })}
                style={{ marginBottom: '16px' }}
            />
            <TextField
                label="Bairro"
                fullWidth
                variant="outlined"
                name="bairro"
                value={cadastro.endereco.bairro}
                onChange={(e) => setCadastro({ ...cadastro, endereco: { ...cadastro.endereco, bairro: e.target.value } })}
                style={{ marginBottom: '16px' }}
            />
            <TextField
                label="Rua"
                fullWidth
                variant="outlined"
                name="rua"
                value={cadastro.endereco.rua}
                onChange={(e) => setCadastro({ ...cadastro, endereco: { ...cadastro.endereco, rua: e.target.value } })}
                style={{ marginBottom: '16px' }}
            />
            <TextField
                label="Número"
                fullWidth
                variant="outlined"
                name="numero"
                value={cadastro.endereco.numero}
                onChange={(e) => setCadastro({ ...cadastro, endereco: { ...cadastro.endereco, numero: e.target.value } })}
                style={{ marginBottom: '16px' }}
            />
            <TextField
                label="Código Postal"
                fullWidth
                variant="outlined"
                name="codigoPostal"
                value={cadastro.endereco.codigoPostal}
                onChange={(e) => setCadastro({ ...cadastro, endereco: { ...cadastro.endereco, codigoPostal: e.target.value } })}
                style={{ marginBottom: '16px' }}
            />
            <TextField
                label="Informações Adicionais"
                fullWidth
                variant="outlined"
                name="informacoesAdicionais"
                value={cadastro.endereco.informacoesAdicionais}
                onChange={(e) => setCadastro({ ...cadastro, endereco: { ...cadastro.endereco, informacoesAdicionais: e.target.value } })}
                style={{ marginBottom: '16px' }}
            />
            <h3>Telefone</h3>
            {cadastro.telefones.map((telefone, index) => (
                <div key={index}>
                    <TextField
                        label={`DDD ${index + 1}`}
                        fullWidth
                        variant="outlined"
                        name="ddd"
                        value={telefone.ddd}
                        onChange={(e) => handleTelefoneChange(index, e)}
                        style={{ marginBottom: '8px' }}
                    />
                    <TextField
                        label={`Número ${index + 1}`}
                        fullWidth
                        variant="outlined"
                        name="numero"
                        value={telefone.numero}
                        onChange={(e) => handleTelefoneChange(index, e)}
                        style={{ marginBottom: '16px' }}
                    />
                </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#6c16a5', color: 'white', '&:hover': { backgroundColor: '#570f7f' } }}
                    onClick={handleSubmit}
                >
                    Cadastrar
                </Button>
            </div>
        </Paper>
    );
};

export default FormularioCadastro;
