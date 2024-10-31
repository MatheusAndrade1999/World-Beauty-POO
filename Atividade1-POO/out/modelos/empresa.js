"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Empresa {
    constructor() {
        this.clientes = [];
        this.produtos = [];
        this.servicos = [];
    }
    // Adiciona um novo cliente
    adicionarCliente(cliente) {
        this.clientes.push(cliente);
    }
    // Remove um cliente pelo CPF
    removerCliente(cpf) {
        this.clientes = this.clientes.filter(cliente => cliente.getCPF.getValor !== cpf);
    }
    // Adiciona um novo produto
    adicionarProduto(produto) {
        this.produtos.push(produto);
    }
    // Remove um produto pelo nome
    removerProduto(nome) {
        this.produtos = this.produtos.filter(produto => produto.getNome !== nome);
    }
    // Adiciona um novo serviço
    adicionarServico(servico) {
        this.servicos.push(servico);
    }
    // Remove um serviço pelo nome
    removerServico(nome) {
        this.servicos = this.servicos.filter(servico => servico.getNome !== nome);
    }
    // Pesquisa um cliente pelo CPF
    buscarCliente(cpf) {
        return this.clientes.find(cliente => cliente.getCPF.getValor === cpf);
    }
    // Retorna a lista de clientes
    get getClientes() {
        return this.clientes;
    }
    // Retorna a lista de produtos
    get getProdutos() {
        return this.produtos;
    }
    // Retorna a lista de serviços
    get getServicos() {
        return this.servicos;
    }
}
exports.default = Empresa;
