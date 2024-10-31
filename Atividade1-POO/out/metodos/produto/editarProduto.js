"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../../entrada"));
const editar_1 = __importDefault(require("../interfaces/editar"));
const authProdutos_1 = __importDefault(require("../middleware/authProdutos"));
const listagemProduto_1 = __importDefault(require("./listagemProduto"));
class EditarProduto extends editar_1.default {
    constructor(produtos) {
        super();
        this.produtos = produtos;
        this.entrada = new entrada_1.default();
    }
    editar() {
        console.clear();
        const auth = new authProdutos_1.default(this.produtos);
        const listagem = new listagemProduto_1.default(this.produtos);
        listagem.listar();
        const id = this.entrada.receberNumero("Digite o número do produto que deseja editar: ");
        const produtoSelecionado = this.produtos[id - 1];
        if (!produtoSelecionado) {
            console.log("Produto não encontrado.");
            return;
        }
        let execucao = true;
        while (execucao) {
            console.log("0 - Sair");
            console.log("1 - Editar nome");
            console.log("2 - Editar preço");
            const opcao = this.entrada.receberNumero("Digite a opção desejada: ");
            switch (opcao) {
                case 0:
                    console.log("Saindo...");
                    execucao = false;
                    break;
                case 1:
                    const novoNome = this.entrada.receberTexto("Digite o novo nome do produto: ");
                    produtoSelecionado.setNome = novoNome;
                    console.log("\nNome alterado com sucesso!\n");
                    break;
                case 2:
                    const novoPreco = this.entrada.receberNumero("Digite o novo preço do produto: ");
                    produtoSelecionado.setPreco = novoPreco;
                    console.log("Preço alterado com sucesso!\n");
                    break;
                default:
                    console.log("Opção inválida. Tente novamente.");
                    break;
            }
        }
    }
}
exports.default = EditarProduto;
