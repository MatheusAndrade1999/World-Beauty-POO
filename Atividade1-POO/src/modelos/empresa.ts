import Cliente from "./cliente";
import CPF from "./cpf";
import Produto from "./produto";
import RG from "./rg";
import Servico from "./servico";
import Telefone from "./telefone";

export default class Empresa {
    private clientes: Cliente[];
    private produtos: Produto[];
    private servicos: Servico[];

    constructor() {
        this.clientes = [];
        this.produtos = [];
        this.servicos = [];
    }

    // Adiciona um novo cliente
    public adicionarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }

    // Remove um cliente pelo CPF
    public removerCliente(cpf: string): void {
        this.clientes = this.clientes.filter(cliente => cliente.getCPF.getValor !== cpf);
    }

    // Adiciona um novo produto
    public adicionarProduto(produto: Produto): void {
        this.produtos.push(produto);
    }

    // Remove um produto pelo nome
    public removerProduto(nome: string): void {
        this.produtos = this.produtos.filter(produto => produto.getNome !== nome);
    }

    // Adiciona um novo serviço
    public adicionarServico(servico: Servico): void {
        this.servicos.push(servico);
    }

    // Remove um serviço pelo nome
    public removerServico(nome: string): void {
        this.servicos = this.servicos.filter(servico => servico.getNome !== nome);
    }

    // Pesquisa um cliente pelo CPF
    public buscarCliente(cpf: string): Cliente | undefined {
        return this.clientes.find(cliente => cliente.getCPF.getValor === cpf);
    }

    // Retorna a lista de clientes
    public get getClientes(): Cliente[] {
        return this.clientes;
    }

    // Retorna a lista de produtos
    public get getProdutos(): Produto[] {
        return this.produtos;
    }

    // Retorna a lista de serviços
    public get getServicos(): Servico[] {
        return this.servicos;
    }
}
