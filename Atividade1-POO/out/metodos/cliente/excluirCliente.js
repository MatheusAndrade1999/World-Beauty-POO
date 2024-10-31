"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const excluir_1 = __importDefault(require("../interfaces/excluir"));
const entrada_1 = __importDefault(require("../../entrada"));
class ExcluirCliente extends excluir_1.default {
    constructor(clientes) {
        super();
        this.clientes = clientes;
        this.entrada = new entrada_1.default();
    }
    // Método para exclusão de cliente com base no CPF
    excluir() {
        // Recebe o CPF do cliente a ser excluído
        const cpf = this.entrada.receberTexto("CPF do cliente: ");
        // Busca o cliente pelo CPF e o remove, se encontrado
        const indexCliente = this.clientes.findIndex(cliente => cliente.getCPF.getValor === cpf);
        if (indexCliente !== -1) {
            this.clientes.splice(indexCliente, 1); // Remove cliente da lista
            console.log("Cliente excluído com sucesso!");
        }
        else {
            console.log("Cliente não encontrado. Verifique o CPF e tente novamente.");
        }
    }
}
exports.default = ExcluirCliente;
