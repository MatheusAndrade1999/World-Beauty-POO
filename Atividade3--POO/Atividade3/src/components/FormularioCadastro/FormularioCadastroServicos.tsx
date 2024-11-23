import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import './FormularioCadastroServicos.css';

interface Servico {
    nome: string;
    preco: string;
}

const FormularioCadastroServico: React.FC = () => {
    const [servico, setServico] = useState<Servico>({ nome: '', preco: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setServico(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        console.log(servico); // Aqui você pode fazer a integração com a API para salvar o serviço
        alert('Serviço cadastrado com sucesso!');
        setServico({ nome: '', preco: '' }); // Limpar o formulário após envio
    };

    return (
        <Paper className="form-container-servico">
            <h2>Cadastrar Serviço</h2>
            <TextField
                label="Nome do Serviço"
                fullWidth
                variant="outlined"
                name="nome"
                value={servico.nome}
                onChange={handleChange}
                style={{ marginBottom: '16px' }}
            />
            <TextField
                label="Preço"
                fullWidth
                variant="outlined"
                name="preco"
                value={servico.preco}
                onChange={handleChange}
                style={{ marginBottom: '16px' }}
            />

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#6c16a5', color: 'white', '&:hover': { backgroundColor: '#570f7f' } }}
                    onClick={handleSubmit}
                >
                    Cadastrar Serviço
                </Button>
            </div>
        </Paper>
    );
};

export default FormularioCadastroServico;
