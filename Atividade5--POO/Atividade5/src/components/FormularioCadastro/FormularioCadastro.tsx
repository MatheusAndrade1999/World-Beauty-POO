import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import './FormularioCadastro.css';
import { cadastrarCliente } from './CadastroCliente'; // Importa a função de cadastro

interface Cadastro {
    nome: string;
    nomeSocial: string;
    genero: string;
    cpf: string;
    rg: string;
    telefone: string;
}

const FormularioCadastro: React.FC = () => {
    const [cadastro, setCadastro] = useState<Cadastro>({
        nome: '',
        nomeSocial: '',
        genero: '',
        cpf: '',
        rg: '',
        telefone: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCadastro(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const cliente = {
                nome: cadastro.nome,
                nomeSocial: cadastro.nomeSocial || null,
                genero: cadastro.genero || null,
                CPF: cadastro.cpf,
                RG: cadastro.rg,
                telefone: cadastro.telefone
            };

            const resposta = await cadastrarCliente(cliente);
            console.log('Cadastro realizado:', resposta);

            alert('Cadastro realizado com sucesso!');
            setCadastro({
                nome: '',
                nomeSocial: '',
                genero: '',
                cpf: '',
                rg: '',
                telefone: ''
            });
        } catch (erro) {
            console.error('Erro ao cadastrar cliente:', erro);
            alert('Ocorreu um erro ao realizar o cadastro. Tente novamente.');
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
                label="Nome Social"
                fullWidth
                variant="outlined"
                name="nomeSocial"
                value={cadastro.nomeSocial}
                onChange={handleChange}
                style={{ marginBottom: '16px' }}
            />
            <TextField
                label="Gênero"
                fullWidth
                variant="outlined"
                name="genero"
                value={cadastro.genero}
                onChange={handleChange}
                style={{ marginBottom: '16px' }}
            />
            <TextField
                label="CPF"
                fullWidth
                variant="outlined"
                name="cpf"
                value={cadastro.cpf}
                onChange={handleChange}
                style={{ marginBottom: '16px' }}
            />
            <TextField
                label="RG"
                fullWidth
                variant="outlined"
                name="rg"
                value={cadastro.rg}
                onChange={handleChange}
                style={{ marginBottom: '16px' }}
            />
            <TextField
                label="Telefone"
                fullWidth
                variant="outlined"
                name="telefone"
                value={cadastro.telefone}
                onChange={handleChange}
                style={{ marginBottom: '16px' }}
            />
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