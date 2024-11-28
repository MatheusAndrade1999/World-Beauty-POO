import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import './FormularioCadastroProduto.css';
import { cadastrarProduto } from './CadastroProdutos'; // Função para enviar dados ao backend

interface Produto {
    nome: string;
    preco: string;
    quantidade: string;
    consumo: string;
}

const FormularioCadastroProduto: React.FC = () => {
    const [produto, setProduto] = useState<Produto>({
        nome: '',
        preco: '',
        quantidade: '',
        consumo: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduto(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            // Preparar os dados para o envio ao backend
            const produtoFormatado = {
                nome: produto.nome,
                preco: parseInt(produto.preco, 10),
                quantidade: parseInt(produto.quantidade, 10),
                consumo: produto.consumo ? parseInt(produto.consumo, 10) : null,
            };

            // Enviar os dados para o backend
            const resposta = await cadastrarProduto(produtoFormatado);
            console.log('Produto cadastrado:', resposta);

            // Mensagem de sucesso e limpar o formulário
            alert('Produto cadastrado com sucesso!');
            setProduto({ nome: '', preco: '', quantidade: '', consumo: '' });
        } catch (erro) {
            console.error('Erro ao cadastrar produto:', erro);
            alert('Ocorreu um erro ao realizar o cadastro. Tente novamente.');
        }
    };

    return (
        <Paper className="form-container-produto">
            <h2>Cadastrar Produto</h2>
            <TextField
                label="Nome do Produto"
                fullWidth
                variant="outlined"
                name="nome"
                value={produto.nome}
                onChange={handleChange}
                style={{ marginBottom: '16px' }}
            />
            <TextField
                label="Preço (em R$)"
                fullWidth
                variant="outlined"
                name="preco"
                value={produto.preco}
                onChange={handleChange}
                style={{ marginBottom: '16px' }}
            />
            <TextField
                label="Quantidade"
                fullWidth
                variant="outlined"
                name="quantidade"
                value={produto.quantidade}
                onChange={handleChange}
                style={{ marginBottom: '16px' }}
            />
            <TextField
                label="Consumo (opcional)"
                fullWidth
                variant="outlined"
                name="consumo"
                value={produto.consumo}
                onChange={handleChange}
                style={{ marginBottom: '16px' }}
            />

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#6c16a5', color: 'white', '&:hover': { backgroundColor: '#570f7f' } }}
                    onClick={handleSubmit}
                >
                    Cadastrar Produto
                </Button>
            </div>
        </Paper>
    );
};

export default FormularioCadastroProduto;
