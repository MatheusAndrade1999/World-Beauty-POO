"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../../entrada"));
class ClientesConsumo {
    constructor(clientes) {
        this.clientes = clientes;
        this.entrada = new entrada_1.default();
    }
    listarClientesQueMaisConsumiram() {
        console.clear();
        let execucao = true;
        while (execucao) {
            console.log("=== Listar Clientes que mais consumiram ===\n");
            console.log("1 - Produtos");
            console.log("2 - Serviços");
            console.log("3 - Sair");
            const opcao = this.entrada.receberNumero("Digite a opção desejada: ");
            switch (opcao) {
                case 1:
                    this.listarTopClientes("produtos", true);
                    break;
                case 2:
                    this.listarTopClientes("serviços", true);
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
    listarClientesQueMenosConsumiram() {
        console.clear();
        let execucao = true;
        while (execucao) {
            console.log("=== Listar Clientes que menos consumiram ===\n");
            console.log("1 - Produtos");
            console.log("2 - Serviços");
            console.log("3 - Sair");
            const opcao = this.entrada.receberNumero("Digite a opção desejada: ");
            switch (opcao) {
                case 1:
                    this.listarTopClientes("produtos", false);
                    break;
                case 2:
                    this.listarTopClientes("serviços", false);
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
    listarClientesQueMaisGastaram() {
        console.clear();
        const clientes = this.clientes.sort((a, b) => b.getGastos - a.getGastos).slice(0, 5);
        console.log("=== Clientes que mais gastaram ===\n");
        clientes.forEach(cliente => {
            console.log(`Nome: ${cliente.nome} - Gastos: ${cliente.getGastos}`);
        });
        this.aguardarContinuacao();
    }
    listarTopClientes(tipo, mais) {
        const comparador = mais
            ? (a, b) => b[`get${tipo.charAt(0).toUpperCase() + tipo.slice(1)}Consumidos`].length - a[`get${tipo.charAt(0).toUpperCase() + tipo.slice(1)}Consumidos`].length
            : (a, b) => a[`get${tipo.charAt(0).toUpperCase() + tipo.slice(1)}Consumidos`].length - b[`get${tipo.charAt(0).toUpperCase() + tipo.slice(1)}Consumidos`].length;
        const topClientes = this.clientes.sort(comparador).slice(0, 10);
        console.log(`=== Listar os 10 Clientes que ${mais ? 'mais' : 'menos'} consumiram ${tipo} ===\n`);
        topClientes.forEach(cliente => {
            console.log(`Nome: ${cliente.nome} - ${tipo.charAt(0).toUpperCase() + tipo.slice(1)} consumidos: ${cliente[`get${tipo.charAt(0).toUpperCase() + tipo.slice(1)}Consumidos`].length}`);
        });
        this.aguardarContinuacao();
    }
    aguardarContinuacao() {
        this.entrada.receberTexto("\nPressione enter para continuar");
    }
}
exports.default = ClientesConsumo;
