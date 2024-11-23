import React, { Component } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import './FormularioCadastroProduto.css';

interface Produto {
    nome: string;
    preco: string;
}

interface State {
    produto: Produto;
}

class FormularioCadastroProduto extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            produto: {
                nome: '',
                preco: ''
            }
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            produto: {
                ...prevState.produto,
                [name]: value
            }
        }));
    };

    handleSubmit = () => {
        console.log(this.state.produto); // Aqui você pode fazer a integração com a API para salvar o produto
        alert('Produto cadastrado com sucesso!');
        this.setState({
            produto: {
                nome: '',
                preco: ''
            }
        });
    };

    render() {
        const { produto } = this.state;

        return (
            <Paper className="form-container-produto">
                <h2>Cadastrar Produto</h2>
                <TextField
                    label="Nome do Produto"
                    fullWidth
                    variant="outlined"
                    name="nome"
                    value={produto.nome}
                    onChange={this.handleChange}
                    style={{ marginBottom: '16px' }}
                />
                <TextField
                    label="Preço"
                    fullWidth
                    variant="outlined"
                    name="preco"
                    value={produto.preco}
                    onChange={this.handleChange}
                    style={{ marginBottom: '16px' }}
                />

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#6c16a5', color: 'white', '&:hover': { backgroundColor: '#570f7f' } }}
                        onClick={this.handleSubmit}
                    >
                        Cadastrar Produto
                    </Button>
                </div>
            </Paper>
        );
    }
}

export default FormularioCadastroProduto;
