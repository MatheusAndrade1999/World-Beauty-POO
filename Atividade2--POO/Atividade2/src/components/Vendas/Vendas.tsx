import React, { Component } from "react";
import { Box, TextField, Typography, Grid, MenuItem } from "@mui/material";
import "./Vendas.css";

interface Produto {
  id: string;
  nome: string;
  preco: number;
}

interface Servico {
  id: string;
  nome: string;
  preco: number;
}

interface Cliente {
  id: string;
  nome: string;
}

const produtosDisponiveis: Produto[] = [
  { id: "1", nome: "Shampoo 20 em 1", preco: 50 },
  { id: "2", nome: "Pomada", preco: 30 },
  { id: "3", nome: "Shampoo", preco: 25 },
];

const servicosDisponiveis: Servico[] = [
  { id: "1", nome: "Corte de Cabelo", preco: 50 },
  { id: "2", nome: "Escova", preco: 40 },
  { id: "3", nome: "Tintura", preco: 80 },
];

const clientesDisponiveis: Cliente[] = [
  { id: "1", nome: "Cliente X" },
  { id: "2", nome: "Cliente Y" },
];

class Vendas extends Component {
  state = {
    clienteId: "",
    clienteNome: "",
    produtosSelecionados: [] as Produto[],
    servicosSelecionados: [] as Servico[],
  };

  handleClienteIdChange = (id: string) => {
    const cliente = clientesDisponiveis.find((c) => c.id === id);
    this.setState({
      clienteId: id,
      clienteNome: cliente ? cliente.nome : "Cliente não encontrado",
    });
  };

  handleAdicionarProduto = (produtoId: string) => {
    const produto = produtosDisponiveis.find((p) => p.id === produtoId);
    if (produto && !this.state.produtosSelecionados.some((p) => p.id === produtoId)) {
      this.setState((prevState: any) => ({
        produtosSelecionados: [...prevState.produtosSelecionados, produto],
      }));
    }
  };

  handleRemoverProduto = (produtoId: string) => {
    this.setState((prevState: any) => ({
      produtosSelecionados: prevState.produtosSelecionados.filter((p: Produto) => p.id !== produtoId),
    }));
  };

  handleAdicionarServico = (servicoId: string) => {
    const servico = servicosDisponiveis.find((s) => s.id === servicoId);
    if (servico && !this.state.servicosSelecionados.some((s) => s.id === servicoId)) {
      this.setState((prevState: any) => ({
        servicosSelecionados: [...prevState.servicosSelecionados, servico],
      }));
    }
  };

  handleRemoverServico = (servicoId: string) => {
    this.setState((prevState: any) => ({
      servicosSelecionados: prevState.servicosSelecionados.filter((s: Servico) => s.id !== servicoId),
    }));
  };

  handleSalvarVenda = () => {
    const { clienteId, clienteNome, produtosSelecionados, servicosSelecionados } = this.state;
    console.log("Cliente:", { id: clienteId, nome: clienteNome });
    console.log("Produtos:", produtosSelecionados);
    console.log("Serviços:", servicosSelecionados);
    alert("Venda salva com sucesso!");
  };

  calcularValorTotal = () => {
    const { produtosSelecionados, servicosSelecionados } = this.state;
    const totalProdutos = produtosSelecionados.reduce((acc: number, produto: Produto) => acc + produto.preco, 0);
    const totalServicos = servicosSelecionados.reduce((acc: number, servico: Servico) => acc + servico.preco, 0);
    return totalProdutos + totalServicos;
  };

  render() {
    const { clienteId, clienteNome, produtosSelecionados, servicosSelecionados } = this.state;
    const valorTotal = this.calcularValorTotal();

    return (
      <Box className="vendas-container">
        <Typography variant="h4" gutterBottom>
          Efetuar Venda
        </Typography>

        <Box className="vendas-input">
          <TextField
            label="ID do Cliente"
            value={clienteId}
            onChange={(e) => this.handleClienteIdChange(e.target.value)}
            fullWidth
            placeholder="Digite o ID do cliente"
          />
          <Typography className="cliente-nome" variant="body1" color={clienteNome ? "textPrimary" : "error"}>
            {clienteNome || "Cliente não encontrado"}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              select
              label="Adicionar Produto"
              fullWidth
              onChange={(e) => this.handleAdicionarProduto(e.target.value)}
            >
              {produtosDisponiveis.map((produto) => (
                <MenuItem key={produto.id} value={produto.id}>
                  {produto.nome} - R${produto.preco.toFixed(2)}
                </MenuItem>
              ))}
            </TextField>
            <Box className="vendas-selecionados">
              <Typography variant="h6">Produtos Selecionados:</Typography>
              {produtosSelecionados.map((produto) => (
                <Box key={produto.id} className="vendas-item">
                  <Typography>{produto.nome}</Typography>
                  <button className="btn-remover" onClick={() => this.handleRemoverProduto(produto.id)}>
                    Remover
                  </button>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              label="Adicionar Serviço"
              fullWidth
              onChange={(e) => this.handleAdicionarServico(e.target.value)}
            >
              {servicosDisponiveis.map((servico) => (
                <MenuItem key={servico.id} value={servico.id}>
                  {servico.nome} - R${servico.preco.toFixed(2)}
                </MenuItem>
              ))}
            </TextField>
            <Box className="vendas-selecionados">
              <Typography variant="h6">Serviços Selecionados:</Typography>
              {servicosSelecionados.map((servico) => (
                <Box key={servico.id} className="vendas-item">
                  <Typography>{servico.nome}</Typography>
                  <button className="btn-remover" onClick={() => this.handleRemoverServico(servico.id)}>
                    Remover
                  </button>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Box className="vendas-footer">
          <Typography variant="h6">Valor Total: R${valorTotal.toFixed(2)}</Typography>
          <button
            className="btn-salvar"
            onClick={this.handleSalvarVenda}
            disabled={!clienteId || valorTotal === 0}
          >
            Salvar Venda
          </button>
        </Box>
      </Box>
    );
  }
}

export default Vendas;
