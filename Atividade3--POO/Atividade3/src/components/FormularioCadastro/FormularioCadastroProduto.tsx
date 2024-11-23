import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import './FormularioCadastroProduto.css';

interface Produto {
    nome: string;
    preco: string;
}

const FormularioCadastroProduto: React.FC = () => {
    const [produto, setProduto] = useState<Produto>({ nome: '', preco: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduto(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        console.log(produto); // Aqui você pode fazer a integração com a API para salvar o produto
        alert('Produto cadastrado com sucesso!');
        setProduto({ nome: '', preco: '' }); // Limpar o formulário após envio
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
                label="Preço"
                fullWidth
                variant="outlined"
                name="preco"
                value={produto.preco}
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
