import React, { useState, useEffect, useMemo } from "react";
import { Box, TextField, Typography, Grid, MenuItem, Button } from "@mui/material";
import axios from "axios";
import "./Vendas.css";

const Vendas: React.FC = () => {
  const [clientesDisponiveis, setClientesDisponiveis] = useState<any[]>([]);
  const [produtosDisponiveis, setProdutosDisponiveis] = useState<any[]>([]);
  const [servicosDisponiveis, setServicosDisponiveis] = useState<any[]>([]);
  const [clienteId, setClienteId] = useState<string>("");
  const [clienteNome, setClienteNome] = useState<string>("");
  const [produtosSelecionados, setProdutosSelecionados] = useState<any[]>([]);
  const [servicosSelecionados, setServicosSelecionados] = useState<any[]>([]);
  const [cpf, setCpf] = useState<string>("");

  // Buscar clientes, produtos e serviços ao carregar o componente
  useEffect(() => {
    const fetchDados = async () => {
      try {
        const clientesResponse = await axios.get("http://localhost:3000/clientes");
        const produtosResponse = await axios.get("http://localhost:3000/produtos");
        const servicosResponse = await axios.get("http://localhost:3000/servicos");

        setClientesDisponiveis(clientesResponse.data);
        setProdutosDisponiveis(produtosResponse.data);
        setServicosDisponiveis(servicosResponse.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchDados();
  }, []);

  // Função para lidar com a seleção de cliente
  const handleClienteIdChange = (id: string) => {
    setClienteId(id);
    const cliente = clientesDisponiveis.find((c: any) => c.id === parseInt(id));
    setClienteNome(cliente ? cliente.nome : "");
  };

  // Função para adicionar um produto à lista de produtos selecionados
  const handleProdutoChange = (produtoId: string) => {
    const produtoSelecionado = produtosDisponiveis.find((produto) => produto.id === parseInt(produtoId));
    if (produtoSelecionado) {
      setProdutosSelecionados((prev) => [...prev, produtoSelecionado]);
    }
  };

  // Função para adicionar um serviço à lista de serviços selecionados
  const handleServicoChange = (servicoId: string) => {
    const servicoSelecionado = servicosDisponiveis.find((servico) => servico.id === parseInt(servicoId));
    if (servicoSelecionado) {
      setServicosSelecionados((prev) => [...prev, servicoSelecionado]);
    }
  };

  // Função para remover um produto individualmente
  const handleRemoverProduto = (produtoId: string) => {
    setProdutosSelecionados((prev) => prev.filter((produto) => produto.id !== parseInt(produtoId)));
  };

  // Função para remover um serviço individualmente
  const handleRemoverServico = (servicoId: string) => {
    setServicosSelecionados((prev) => prev.filter((servico) => servico.id !== parseInt(servicoId)));
  };

  // Função para calcular o valor total (produtos + serviços)
  const valorTotal = useMemo(() => {
    const totalProdutos = produtosSelecionados.reduce((acc, produto) => acc + produto.preco, 0);
    const totalServicos = servicosSelecionados.reduce((acc, servico) => acc + servico.preco, 0);
    return totalProdutos + totalServicos;
  }, [produtosSelecionados, servicosSelecionados]);

  // Função para salvar a venda
  const handleSalvarVenda = async () => {
    try {
     
      // Salvar produtos
      for (const produto of produtosSelecionados) {
        const dadosProduto = {
          cpf: cpf, 
          produto_id: produto.id,
          quantidade: 1, // Ajuste conforme necessário (pode ser uma entrada do usuário para quantidade)
        };
        await axios.post("http://localhost:3000/compras_produtos", dadosProduto);
      }

      // Salvar serviços
      for (const servico of servicosSelecionados) {
        const dadosServico = {
          cpf: cpf,
          servico_id: servico.id,
        };
        await axios.post("http://localhost:3000/compras_servicos", dadosServico);
      }

      // Exibir dados salvos no console
      console.log("Cliente:", { id: clienteId, nome: clienteNome });
      console.log("Produtos:", produtosSelecionados);
      console.log("Serviços:", servicosSelecionados);

      // Mensagem de sucesso
      alert("Venda salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar venda:", error);
      alert("Erro ao salvar venda. Tente novamente.");
    }
  };

  return (
    <Box className="vendas-container">
      <Typography variant="h4" gutterBottom>
        Efetuar Venda
      </Typography>

      {/* Seção de seleção do cliente */}
      <Box className="vendas-input">
        <TextField
          select
          label="Selecionar Cliente"
          value={clienteId}
          onChange={(e) => handleClienteIdChange(e.target.value)}
          fullWidth
        >
          {clientesDisponiveis.map((cliente: any) => (
            <MenuItem key={cliente.id} value={cliente.id} onChange={()=>setCpf(cliente.CPF)}>
              {cliente.nome} - CPF: {cliente.CPF}
            </MenuItem>
          ))}
        </TextField>
        <Typography className="cliente-nome" variant="body1" color={clienteNome ? "textPrimary" : "error"}>
          {clienteNome || "Cliente não encontrado"}
        </Typography>
      </Box>

      {/* Seção de seleção de produtos */}
      <Box className="produtos-selecionados">
        <Typography variant="h6">Selecione um Produto</Typography>
        <TextField
          select
          label="Produto"
          onChange={(e) => handleProdutoChange(e.target.value)}
          fullWidth
        >
          {produtosDisponiveis.map((produto: any) => (
            <MenuItem key={produto.id} value={produto.id}>
              {produto.nome} - Preço: R${produto.preco}
            </MenuItem>
          ))}
        </TextField>

        {/* Exibição dos produtos selecionados com botão de remoção */}
        <Grid container spacing={2}>
          {produtosSelecionados.map((produto, index) => (
            <Grid item key={index}>
              <Typography>{produto.nome} - Preço: R${produto.preco}</Typography>
              <Button variant="outlined" color="secondary" onClick={() => handleRemoverProduto(produto.id)}>
                Remover
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Seção de seleção de serviços */}
      <Box className="servicos-selecionados">
        <Typography variant="h6">Selecione um Serviço</Typography>
        <TextField
          select
          label="Serviço"
          onChange={(e) => handleServicoChange(e.target.value)}
          fullWidth
        >
          {servicosDisponiveis.map((servico: any) => (
            <MenuItem key={servico.id} value={servico.id}>
              {servico.nome} - Preço: R${servico.preco}
            </MenuItem>
          ))}
        </TextField>

        {/* Exibição dos serviços selecionados com botão de remoção */}
        <Grid container spacing={2}>
          {servicosSelecionados.map((servico, index) => (
            <Grid item key={index}>
              <Typography>{servico.nome} - Preço: R${servico.preco}</Typography>
              <Button variant="outlined" color="secondary" onClick={() => handleRemoverServico(servico.id)}>
                Remover
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Seção do valor total */}
      <Box className="total">
        <Typography variant="h5">Valor Total: R${valorTotal}</Typography>
      </Box>

      {/* Botão para salvar a venda */}
      <Box className="vendas-buttons">
        <Button variant="contained" color="primary" onClick={handleSalvarVenda}>
          Salvar Venda
        </Button>
      </Box>
    </Box>
  );
};

export default Vendas;
