"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../../entrada"));
class ServicosProdutosConsumo {
    constructor(produtos, servicos) {
        this.produtos = produtos;
        this.servicos = servicos;
        this.entrada = new entrada_1.default();
    }
    listarProdutoServicoMaisConsumido() {
        console.clear();
        let execucao = true;
        while (execucao) {
            console.log("=== Listar serviços ou produtos mais consumidos ===\n");
            console.log("1 - Produtos");
            console.log("2 - Serviços");
            console.log("3 - Sair");
            const opcao = this.entrada.receberNumero("Digite a opção desejada: ");
            switch (opcao) {
                case 1:
                    console.log("\n=== Listagem dos produtos mais consumidos ===\n");
                    this.listarMaisConsumidos(this.produtos);
                    break;
                case 2:
                    console.log("\n=== Listagem dos serviços mais consumidos ===\n");
                    this.listarMaisConsumidos(this.servicos);
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
    listarMaisConsumidos(itens) {
        const itensOrdenados = itens.sort((a, b) => b.getConsumo - a.getConsumo);
        itensOrdenados.forEach(item => {
            console.log(`Nome: ${item.getNome} - Vezes consumido: ${item.getConsumo}`);
        });
        this.aguardarContinuacao();
    }
    aguardarContinuacao() {
        this.entrada.receberTexto("\nPressione enter para continuar");
    }
}
exports.default = ServicosProdutosConsumo;
