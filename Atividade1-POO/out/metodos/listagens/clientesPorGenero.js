"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../../entrada"));
class ClientesPorGenero {
    constructor(clientes) {
        this.clientes = clientes;
        this.entrada = new entrada_1.default();
    }
    listarClientesPorGenero() {
        let execucao = true;
        while (execucao) {
            console.log("=== Listar Clientes por Gênero ===\n");
            console.log("1 - Masculino");
            console.log("2 - Feminino");
            console.log("3 - Sair");
            const opcao = this.entrada.receberNumero("Digite a opção desejada: ");
            let executar = true;
            switch (opcao) {
                case 1:
                    console.log("=== Listagem dos clientes masculinos ===\n");
                    this.clientes.filter(cliente => cliente.getGenero == "M").forEach(cliente => {
                        console.log(`Nome: ${cliente.nome}`);
                    });
                    while (executar) {
                        let opcao = this.entrada.receberTexto("\nPressione enter para continuar");
                        switch (opcao) {
                            default:
                                executar = false;
                                break;
                        }
                    }
                case 2:
                    console.log("=== Listagem dos clientes femininos ===\n");
                    this.clientes.filter(cliente => cliente.getGenero == "F").forEach(cliente => {
                        console.log(`Nome: ${cliente.nome}`);
                    });
                    while (executar) {
                        let opcao = this.entrada.receberTexto("\nPressione enter para continuar");
                        switch (opcao) {
                            default:
                                executar = false;
                                break;
                        }
                    }
                case 3:
                    execucao = false;
                    break;
            }
        }
    }
}
exports.default = ClientesPorGenero;
