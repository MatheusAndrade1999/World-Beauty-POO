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
            console.clear();
            console.log("=== Listar Clientes por Gênero ===\n");
            console.log("1 - Masculino");
            console.log("2 - Feminino");
            console.log("3 - Sair");
            const opcao = this.entrada.receberNumero("Digite a opção desejada: ");
            switch (opcao) {
                case 1:
                    console.log("\n=== Listagem dos clientes masculinos ===\n");
                    this.clientes
                        .filter(cliente => cliente.getGenero === "M")
                        .forEach(cliente => console.log(`Nome: ${cliente.nome}`));
                    this.aguardarContinuacao();
                    break;
                case 2:
                    console.log("\n=== Listagem dos clientes femininos ===\n");
                    this.clientes
                        .filter(cliente => cliente.getGenero === "F")
                        .forEach(cliente => console.log(`Nome: ${cliente.nome}`));
                    this.aguardarContinuacao();
                    break;
                case 3:
                    execucao = false;
                    break;
                default:
                    console.log("Opção inválida");
                    break;
            }
        }
    }
    aguardarContinuacao() {
        this.entrada.receberTexto("\nPressione enter para continuar");
    }
}
exports.default = ClientesPorGenero;
