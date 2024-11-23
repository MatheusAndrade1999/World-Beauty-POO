import React, { Component } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import './FormularioCadastroServicos.css';

interface Servico {
    nome: string;
    preco: string;
}

interface State {
    servico: Servico;
}

class FormularioCadastroServico extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            servico: {
                nome: '',
                preco: ''
            }
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            servico: {
                ...prevState.servico,
                [name]: value
            }
        }));
    };

    handleSubmit = () => {
        console.log(this.state.servico); // Aqui você pode fazer a integração com a API para salvar o serviço
        alert('Serviço cadastrado com sucesso!');
        this.setState({
            servico: {
                nome: '',
                preco: ''
            }
        });
    };

    render() {
        const { servico } = this.state;

        return (
            <Paper className="form-container-servico">
                <h2>Cadastrar Serviço</h2>
                <TextField
                    label="Nome do Serviço"
                    fullWidth
                    variant="outlined"
                    name="nome"
                    value={servico.nome}
                    onChange={this.handleChange}
                    style={{ marginBottom: '16px' }}
                />
                <TextField
                    label="Preço"
                    fullWidth
                    variant="outlined"
                    name="preco"
                    value={servico.preco}
                    onChange={this.handleChange}
                    style={{ marginBottom: '16px' }}
                />

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#6c16a5', color: 'white', '&:hover': { backgroundColor: '#570f7f' } }}
                        onClick={this.handleSubmit}
                    >
                        Cadastrar Serviço
                    </Button>
                </div>
            </Paper>
        );
    }
}

export default FormularioCadastroServico;
