"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authProdutos_1 = __importDefault(require("../middleware/authProdutos"));
const produto_1 = __importDefault(require("../../modelos/produto"));
const entrada_1 = __importDefault(require("../../entrada"));
const cadastro_1 = __importDefault(require("../interfaces/cadastro"));
class CadastrarProduto extends cadastro_1.default {
    constructor(produtos) {
        super();
        this.produtos = produtos;
        this.entrada = new entrada_1.default();
    }
    cadastrar() {
        console.clear();
        // Variável para autenticação do produto
        const auth = new authProdutos_1.default(this.produtos);
        // Variáveis para armazenar os dados do produto
        let nome = this.entrada.receberTexto("Nome do produto: ");
        // Loop para verificar se o nome do produto já está cadastrado
        while (auth.autenticarProduto(nome)) {
            console.log("Produto já cadastrado. Tente novamente.");
            nome = this.entrada.receberTexto("Nome do produto: ");
        }
        const preco = this.entrada.receberNumero("Preço do produto: ");
        const produto = new produto_1.default(nome, preco);
        this.produtos.push(produto);
        console.log("Produto cadastrado com sucesso!");
    }
}
exports.default = CadastrarProduto;
