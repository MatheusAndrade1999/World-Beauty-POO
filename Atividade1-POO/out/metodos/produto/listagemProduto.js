"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listagem_1 = __importDefault(require("../interfaces/listagem"));
const entrada_1 = __importDefault(require("../../entrada"));
class ListagemProdutos extends listagem_1.default {
    constructor(produtos) {
        super();
        this.produtos = produtos;
        this.entrada = new entrada_1.default();
    }
    listar() {
        console.clear();
        console.log('\nListagem de Produtos');
        console.log('=====================');
        this.produtos.forEach((produto, index) => {
            console.log(` ${index + 1} - Produto: ${produto.getNome} | Preço: R$ ${produto.getPreco.toFixed(2)}`);
            console.log('\n');
        });
        this.aguardarSaida();
    }
    aguardarSaida() {
        let execucao = true;
        while (execucao) {
            const opcao = this.entrada.receberNumero('Aperte qualquer tecla para sair: ');
            execucao = false; // A opção aqui não está sendo utilizada, o loop simplesmente termina
        }
    }
}
exports.default = ListagemProdutos;
