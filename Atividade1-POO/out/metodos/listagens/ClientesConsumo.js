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
                    console.log("=== Listar os 10 Clientes que mais consumiram produtos ===\n");
                    let executarProdutos = true;
                    let clientes_produtos = this.clientes.sort((a, b) => b.getProdutosConsumidos.length - a.getProdutosConsumidos.length).slice(0, 10);
                    clientes_produtos.forEach(cliente => {
                        console.log(`Nome ${cliente.nome} - Produtos consumidos: ${cliente.getProdutosConsumidos.length}`);
                    });
                    while (executarProdutos) {
                        let opcao = this.entrada.receberTexto("\nPressione enter para continuar");
                        switch (opcao) {
                            default:
                                executarProdutos = false;
                                break;
                        }
                    }
                    break;
                case 2:
                    console.log("=== Listar os 10 Clientes que mais consumiram serviços ===\n");
                    let executarServicos = true;
                    let clientes_servicos = this.clientes.sort((a, b) => b.getServicosConsumidos.length - a.getServicosConsumidos.length).slice(0, 10);
                    clientes_servicos.forEach(cliente => {
                        console.log(`Nome: ${cliente.nome} - Serviços consumidos: ${cliente.getServicosConsumidos.length}`);
                    });
                    while (executarServicos) {
                        let opcao = this.entrada.receberTexto("\nPressione enter para continuar");
                        switch (opcao) {
                            default:
                                executarServicos = false;
                                break;
                        }
                    }
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
                    console.log("=== Listar os 10 Clientes que menos consumiram produtos ===\n");
                    let executarProdutos = true;
                    let clientes_produtos = this.clientes.sort((a, b) => a.getProdutosConsumidos.length - b.getProdutosConsumidos.length).slice(0, 10);
                    clientes_produtos.forEach(cliente => {
                        console.log(`Nome ${cliente.nome} - Produtos consumidos: ${cliente.getProdutosConsumidos.length}`);
                    });
                    while (executarProdutos) {
                        let opcao = this.entrada.receberTexto("\nPressione enter para continuar");
                        switch (opcao) {
                            default:
                                executarProdutos = false;
                                break;
                        }
                    }
                    break;
                case 2:
                    console.log("=== Listar os 10 Clientes que menos consumiram serviços ===\n");
                    let executarServicos = true;
                    let clientes_servicos = this.clientes.sort((a, b) => a.getServicosConsumidos.length - b.getServicosConsumidos.length).slice(0, 10);
                    clientes_servicos.forEach(cliente => {
                        console.log(`Nome: ${cliente.nome} - Serviços consumidos: ${cliente.getServicosConsumidos.length}`);
                    });
                    while (executarServicos) {
                        let opcao = this.entrada.receberTexto("\nPressione enter para continuar");
                        switch (opcao) {
                            default:
                                executarServicos = false;
                                break;
                        }
                    }
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
        let execucao = true;
        let clientes = this.clientes.sort((a, b) => b.getGastos - a.getGastos).slice(0, 5);
        clientes.forEach(cliente => {
            console.log(`Nome: ${cliente.nome} - Gastos: ${cliente.getGastos}`);
        });
        while (execucao) {
            let opcao = this.entrada.receberTexto("\nPressione enter para continuar");
            switch (opcao) {
                default:
                    execucao = false;
                    break;
            }
        }
    }
}
exports.default = ClientesConsumo;
