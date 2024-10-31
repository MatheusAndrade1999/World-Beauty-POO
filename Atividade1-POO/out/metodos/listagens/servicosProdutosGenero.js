"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../../entrada"));
class ServicosProdutosGenero {
    constructor(clientes, produtos, servicos) {
        this.produtos = produtos;
        this.servicos = servicos;
        this.clientes = clientes;
        this.entrada = new entrada_1.default();
    }
    // Método genérico para listar produtos ou serviços por gênero
    listarMaisConsumidosPorGenero(itens, genero) {
        console.clear();
        const clientesGenero = this.clientes.filter(cliente => cliente.getGenero === genero);
        const itensConsumidos = itens.filter(item => clientesGenero.some(cliente => cliente.getProdutosConsumidos.some(consumo => consumo.getNome === item.getNome))).sort((a, b) => b.getConsumo - a.getConsumo);
        itensConsumidos.forEach(item => {
            console.log(`Nome: ${item.getNome} - Vezes consumido: ${item.getConsumo}`);
        });
        this.aguardarContinuacao();
    }
    listarProdutosMasculino() {
        console.log("=== Listagem dos produtos mais consumidos por gênero masculino ===\n");
        this.listarMaisConsumidosPorGenero(this.produtos, "M");
    }
    listarServicosMasculino() {
        console.log("=== Listagem dos serviços mais consumidos por gênero masculino ===\n");
        this.listarMaisConsumidosPorGenero(this.servicos, "M");
    }
    listarProdutosFeminino() {
        console.log("=== Listagem dos produtos mais consumidos por gênero feminino ===\n");
        this.listarMaisConsumidosPorGenero(this.produtos, "F");
    }
    listarServicosFeminino() {
        console.log("=== Listagem dos serviços mais consumidos por gênero feminino ===\n");
        this.listarMaisConsumidosPorGenero(this.servicos, "F");
    }
    listarServicosProdutosGenero() {
        let execucao = true;
        while (execucao) {
            console.clear();
            console.log("=== Listar serviços ou produtos mais consumidos por gênero ===\n");
            console.log("1 - Produtos");
            console.log("2 - Serviços");
            console.log("3 - Sair");
            const opcao = this.entrada.receberNumero("Digite a opção desejada: ");
            switch (opcao) {
                case 1:
                    this.exibirMenuGenero(() => this.listarProdutosMasculino(), () => this.listarProdutosFeminino());
                    break;
                case 2:
                    this.exibirMenuGenero(() => this.listarServicosMasculino(), () => this.listarServicosFeminino());
                    break;
                case 3:
                    execucao = false;
                    break;
                default:
                    console.log("Opção inválida, tente novamente.");
                    break;
            }
        }
    }
    // Método para exibir o menu de gênero e listar produtos ou serviços
    exibirMenuGenero(callbackMasculino, callbackFeminino) {
        let execucaoGenero = true;
        while (execucaoGenero) {
            console.clear();
            console.log("=== Escolha o gênero ===\n");
            console.log("1 - Masculino");
            console.log("2 - Feminino");
            console.log("3 - Voltar");
            const opcao = this.entrada.receberNumero("Digite a opção desejada: ");
            switch (opcao) {
                case 1:
                    callbackMasculino();
                    break;
                case 2:
                    callbackFeminino();
                    break;
                case 3:
                    execucaoGenero = false;
                    break;
                default:
                    console.log("Opção inválida, tente novamente.");
                    break;
            }
        }
    }
    aguardarContinuacao() {
        this.entrada.receberTexto("\nPressione enter para continuar");
    }
}
exports.default = ServicosProdutosGenero;
