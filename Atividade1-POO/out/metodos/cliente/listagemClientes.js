"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listagem_1 = __importDefault(require("../interfaces/listagem"));
const entrada_1 = __importDefault(require("../../entrada"));
class ListagemClientes extends listagem_1.default {
    constructor(clientes) {
        super();
        this.clientes = clientes;
        this.entrada = new entrada_1.default();
    }
    // Método principal para exibir a lista de clientes com suas informações detalhadas
    listar() {
        console.clear();
        console.log('\n Listagem de Clientes');
        console.log('=====================');
        // Exibindo informações de cada cliente na lista
        this.clientes.forEach(cliente => {
            console.log(`Nome: ${cliente.nome}`);
            console.log(`Nome social: ${cliente.nomeSocial}`);
            console.log(`CPF: ${cliente.getCPF.getValor}`);
            console.log(`Gênero: ${cliente.getGenero}`);
            // Mostrando RGS do cliente em uma lista formatada
            console.log(`RGs: ${cliente.getRgs.map(rg => rg.getValor).join(', ')}`);
            // Exibindo telefones no formato (DDD) Número
            console.log(`Telefones: ${cliente.getTelefones.map(telefone => `(${telefone.getDdd}) ${telefone.getNumero}`).join(', ')}`);
            console.log("=====================");
        });
        // Controlando saída do programa após listagem
        let execucao = true;
        while (execucao) {
            const opcao = this.entrada.receberNumero('Pressione qualquer tecla para sair: ');
            // A qualquer entrada, termina a execução do laço e exibe a saída
            console.log('Saindo...');
            execucao = false;
        }
    }
}
exports.default = ListagemClientes;
