import React, { Component } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import './FormularioCadastro.css';

interface Cadastro {
    nome: string;
    nomeSocial: string;
    genero: string;
    cpf: string;
    rg: string;
    telefone: string;
}

interface State {
    cadastro: Cadastro;
}

class FormularioCadastro extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            cadastro: {
                nome: '',
                nomeSocial: '',
                genero: '',
                cpf: '',
                rg: '',
                telefone: ''
            }
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            cadastro: {
                ...prevState.cadastro,
                [name]: value
            }
        }));
    };

    handleSubmit = () => {
        console.log(this.state.cadastro); // Aqui você pode fazer a integração com a API para salvar o cadastro
        alert('Cadastro realizado com sucesso!');
        this.setState({
            cadastro: {
                nome: '',
                nomeSocial: '',
                genero: '',
                cpf: '',
                rg: '',
                telefone: ''
            }
        });
    };

    render() {
        const { cadastro } = this.state;

        return (
            <Paper className="form-container">
                <h2>Cadastrar Cliente</h2>
                <TextField
                    label="Nome"
                    fullWidth
                    variant="outlined"
                    name="nome"
                    value={cadastro.nome}
                    onChange={this.handleChange}
                    style={{ marginBottom: '16px' }}
                />
                <TextField
                    label="Nome Social"
                    fullWidth
                    variant="outlined"
                    name="nomeSocial"
                    value={cadastro.nomeSocial}
                    onChange={this.handleChange}
                    style={{ marginBottom: '16px' }}
                />
                <TextField
                    label="Gênero"
                    fullWidth
                    variant="outlined"
                    name="genero"
                    value={cadastro.genero}
                    onChange={this.handleChange}
                    style={{ marginBottom: '16px' }}
                />
                <TextField
                    label="CPF"
                    fullWidth
                    variant="outlined"
                    name="cpf"
                    value={cadastro.cpf}
                    onChange={this.handleChange}
                    style={{ marginBottom: '16px' }}
                />
                <TextField
                    label="RG"
                    fullWidth
                    variant="outlined"
                    name="rg"
                    value={cadastro.rg}
                    onChange={this.handleChange}
                    style={{ marginBottom: '16px' }}
                />
                <TextField
                    label="Telefone"
                    fullWidth
                    variant="outlined"
                    name="telefone"
                    value={cadastro.telefone}
                    onChange={this.handleChange}
                    style={{ marginBottom: '16px' }}
                />

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#6c16a5', color: 'white', '&:hover': { backgroundColor: '#570f7f' } }}
                        onClick={this.handleSubmit}
                    >
                        Cadastrar
                    </Button>
                </div>
            </Paper>
        );
    }
}

export default FormularioCadastro;