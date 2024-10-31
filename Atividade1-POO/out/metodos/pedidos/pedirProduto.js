"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pedir_1 = __importDefault(require("../interfaces/pedir"));
const listagemProduto_1 = __importDefault(require("../produto/listagemProduto"));
const authCliente_1 = __importDefault(require("../middleware/authCliente"));
const entrada_1 = __importDefault(require("../../entrada"));
class PedirProduto extends pedir_1.default {
    constructor(clientes, produtos, empresa) {
        super();
        this.entrada = new entrada_1.default();
        this.clientes = clientes;
        this.produtos = produtos;
        this.empresa = empresa;
    }
    pedir() {
        console.clear();
        const auth_cliente = new authCliente_1.default(this.clientes);
        console.log("=== Pedir Produto ===\n");
        const cpf_cliente = this.entrada.receberTexto("Digite o CPF do cliente: ");
        const autenticacao = auth_cliente.cpfExiste(cpf_cliente);
        if (!autenticacao) {
            console.log("Cliente não encontrado, verifique se o CPF existe ou se foi digitado corretamente");
            return;
        }
        else {
            let executar = true;
            const cliente = this.clientes.find(cliente => cliente.getCPF.getValor === cpf_cliente);
            const listagem = new listagemProduto_1.default(this.produtos);
            listagem.listar();
            while (executar) {
                let id_produto = this.entrada.receberNumero("Digite o número do produto que vai ser atribuído: ");
                // Validação do índice do produto
                if (id_produto < 1 || id_produto > this.produtos.length) {
                    console.log("Produto inválido. Por favor, tente novamente.");
                    continue;
                }
                const produto_selecionado = this.produtos[id_produto - 1];
                cliente.setProdutoConsumido = produto_selecionado;
                cliente.setGastos = produto_selecionado.getPreco + cliente.getGastos;
                produto_selecionado.setConsumo = produto_selecionado.getConsumo + 1;
                console.log("Produto adicionado com sucesso!");
                const resposta = this.entrada.receberTexto("Deseja adicionar mais produtos? (s/n): ");
                executar = resposta.toLowerCase() === "s";
            }
        }
    }
}
exports.default = PedirProduto;
