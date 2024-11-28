import React, { useState } from 'react';

import FormularioCadastroCliente from '../../components/FormularioCadastro/FormularioCadastro';
import FormularioCadastroProduto from '../../components/FormularioCadastro/FormularioCadastroProduto';
import FormularioCadastroServico from '../../components/FormularioCadastro/FormularioCadastroServicos';
import { Button, Paper } from '@mui/material';
import './Cadastro.css'; // Importando o CSS específico para a página de cadastros

const Cadastros: React.FC = () => {
    const [tipoCadastro, setTipoCadastro] = useState<'cliente' | 'produto' | 'servico'>('cliente');

    const renderForm = () => {
        switch (tipoCadastro) {
            case 'cliente':
                return <FormularioCadastroCliente />;
            case 'produto':
                return <FormularioCadastroProduto />;
            case 'servico':
                return <FormularioCadastroServico />;
            default:
                return <FormularioCadastroCliente />;
        }
    };

    return (
        <div className="cadastros-page">
            {/* Papel modificado com o sx para remover sombra e borda */}
            <Paper 
                className="cadastro-container"
                sx={{ boxShadow: 'none', backgroundColor: 'transparent' }} // Removendo sombra e fundo transparente
            >
                <h2>Escolha o tipo de cadastro</h2>
                <div className="buttons-container">
                    <Button 
                        variant="contained" 
                        onClick={() => setTipoCadastro('cliente')}
                        sx={{ backgroundColor: '#6c16a5', color: 'white', '&:hover': { backgroundColor: '#570f7f' } }}
                    >
                        Cadastrar Cliente
                    </Button>
                    <Button 
                        variant="contained" 
                        onClick={() => setTipoCadastro('produto')}
                        sx={{ backgroundColor: '#6c16a5', color: 'white', '&:hover': { backgroundColor: '#570f7f' } }}
                    >
                        Cadastrar Produto
                    </Button>
                    <Button 
                        variant="contained" 
                        onClick={() => setTipoCadastro('servico')}
                        sx={{ backgroundColor: '#6c16a5', color: 'white', '&:hover': { backgroundColor: '#570f7f' } }}
                    >
                        Cadastrar Serviço
                    </Button>
                </div>

                <div className="form-container">
                    {renderForm()}
                </div>
            </Paper>
        </div>
    );
}

export default Cadastros;
