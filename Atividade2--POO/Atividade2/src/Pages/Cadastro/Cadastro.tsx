import React, { Component } from 'react';
import FormularioCadastroCliente from '../../components/FormularioCadastro/FormularioCadastro';
import FormularioCadastroProduto from '../../components/FormularioCadastro/FormularioCadastroProduto';
import FormularioCadastroServico from '../../components/FormularioCadastro/FormularioCadastroServicos';
import { Button, Paper } from '@mui/material';
import './Cadastro.css'; // Importando o CSS específico para a página de cadastros

class Cadastros extends Component {
  state = {
    tipoCadastro: 'cliente' as 'cliente' | 'produto' | 'servico',
  };

  setTipoCadastro = (tipo: 'cliente' | 'produto' | 'servico') => {
    this.setState({ tipoCadastro: tipo });
  };

  renderForm = () => {
    const { tipoCadastro } = this.state;
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

  render() {
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
              onClick={() => this.setTipoCadastro('cliente')}
              sx={{
                backgroundColor: '#6c16a5',
                color: 'white',
                '&:hover': { backgroundColor: '#570f7f' },
              }}
            >
              Cadastrar Cliente
            </Button>
            <Button
              variant="contained"
              onClick={() => this.setTipoCadastro('produto')}
              sx={{
                backgroundColor: '#6c16a5',
                color: 'white',
                '&:hover': { backgroundColor: '#570f7f' },
              }}
            >
              Cadastrar Produto
            </Button>
            <Button
              variant="contained"
              onClick={() => this.setTipoCadastro('servico')}
              sx={{
                backgroundColor: '#6c16a5',
                color: 'white',
                '&:hover': { backgroundColor: '#570f7f' },
              }}
            >
              Cadastrar Serviço
            </Button>
          </div>

          <div className="form-container">{this.renderForm()}</div>
        </Paper>
      </div>
    );
  }
}

export default Cadastros;
