"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listagem_1 = __importDefault(require("../interfaces/listagem"));
const entrada_1 = __importDefault(require("../../entrada"));
class ListarPedidosServicos extends listagem_1.default {
    constructor(clientes) {
        super();
        this.clientes = clientes;
        this.entrada = new entrada_1.default();
    }
    set setServicos(servicos) {
        this.servicos = servicos;
    }
    listar() {
        console.clear();
        let executar = true;
        console.log("=== Listar Pedidos de Serviços ===\n");
        const cpf_cliente = this.entrada.receberTexto("Digite o CPF do cliente: ");
        const cliente = this.clientes.find(cliente => cliente.getCPF.getValor == cpf_cliente);
        if (cliente) {
            console.log("\n Serviços consumidos pelo cliente: ");
            cliente.getServicosConsumidos.forEach(servico => {
                console.log(`Nome: ${servico.getNome} - Preço: ${servico.getPreco} `);
            });
        }
        else {
            console.log("Cliente não encontrado, verifique se o cpf existe ou se foi digitado corretamente");
        }
        while (executar) {
            let opcao = this.entrada.receberTexto("\nPressione enter para continuar");
            switch (opcao) {
                default:
                    executar = false;
                    break;
            }
        }
    }
}
exports.default = ListarPedidosServicos;
