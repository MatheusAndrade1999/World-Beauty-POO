"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listagem_1 = __importDefault(require("../interfaces/listagem"));
const entrada_1 = __importDefault(require("../../entrada"));
class ListarPedidosProdutos extends listagem_1.default {
    constructor(clientes) {
        super();
        this.clientes = clientes;
        this.entrada = new entrada_1.default();
    }
    listar() {
        console.clear();
        let executar = true;
        console.log("=== Listar Pedidos de Produtos ===\n");
        const cpfCliente = this.entrada.receberTexto("Digite o CPF do cliente: ").trim();
        const cliente = this.clientes.find(cliente => cliente.getCPF.getValor === cpfCliente);
        if (cliente) {
            console.log("\nProdutos consumidos pelo cliente:");
            cliente.getProdutosConsumidos.forEach(produto => {
                console.log(`Nome: ${produto.getNome} - Preço: ${produto.getPreco}`);
            });
        }
        else {
            console.log("Cliente não encontrado. Verifique se o CPF existe ou se foi digitado corretamente.");
        }
        while (executar) {
            const opcao = this.entrada.receberTexto("\nPressione enter para continuar");
            switch (opcao) {
                default:
                    executar = false;
                    break;
            }
        }
    }
    listarProdutosMaisPedidos() {
        console.clear();
        // Aqui você pode implementar a lógica para listar os produtos mais pedidos
        console.log("Em desenvolvimento...");
    }
}
exports.default = ListarPedidosProdutos;
