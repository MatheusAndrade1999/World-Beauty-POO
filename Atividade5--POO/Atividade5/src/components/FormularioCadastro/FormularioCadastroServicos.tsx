import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import './FormularioCadastroServicos.css';
import { cadastrarServico } from './CadastroServicos'; // Função para enviar dados ao backend

interface Servico {
    nome: string;
    preco: string;
    consumo: string;
}

const FormularioCadastroServico: React.FC = () => {
    const [servico, setServico] = useState<Servico>({
        nome: '',
        preco: '',
        consumo: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setServico(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            // Preparar os dados para envio ao backend
            const servicoFormatado = {
                nome: servico.nome,
                preco: parseInt(servico.preco, 10),
                consumo: servico.consumo ? parseInt(servico.consumo, 10) : null,
            };

            // Enviar os dados para o backend
            const resposta = await cadastrarServico(servicoFormatado);
            console.log('Serviço cadastrado:', resposta);

            // Mensagem de sucesso e limpar o formulário
            alert('Serviço cadastrado com sucesso!');
            setServico({ nome: '', preco: '', consumo: '' });
        } catch (erro) {
            console.error('Erro ao cadastrar serviço:', erro);
            alert('Ocorreu um erro ao realizar o cadastro. Tente novamente.');
        }
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
                label="Preço (em R$)"
                fullWidth
                variant="outlined"
                name="preco"
                value={servico.preco}
                onChange={handleChange}
                style={{ marginBottom: '16px' }}
            />
            <TextField
                label="Consumo (opcional)"
                fullWidth
                variant="outlined"
                name="consumo"
                value={servico.consumo}
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
