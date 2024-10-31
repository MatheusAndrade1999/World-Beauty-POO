"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../../entrada"));
const editar_1 = __importDefault(require("../interfaces/editar"));
const authServicos_1 = __importDefault(require("../middleware/authServicos"));
const listagemServico_1 = __importDefault(require("./listagemServico"));
class EditarServico extends editar_1.default {
    constructor(servicos) {
        super();
        this.servicos = servicos;
        this.entrada = new entrada_1.default();
    }
    editar() {
        console.clear();
        const auth = new authServicos_1.default(this.servicos);
        const listagem = new listagemServico_1.default(this.servicos);
        listagem.listar();
        const id = this.entrada.receberNumero("Digite o número do serviço que deseja editar: ");
        if (this.servicos[id - 1]) {
            this.executarEdicao(id - 1);
        }
        else {
            console.log("Serviço não encontrado.");
        }
    }
    executarEdicao(index) {
        let execucao = true;
        while (execucao) {
            console.log("0 - Sair");
            console.log("1 - Editar nome");
            console.log("2 - Editar preço");
            const opcao = this.entrada.receberNumero("Digite a opção desejada: ");
            const servicoSelecionado = this.servicos[index];
            switch (opcao) {
                case 0:
                    console.log("Saindo...");
                    execucao = false;
                    break;
                case 1:
                    this.editarNome(servicoSelecionado);
                    break;
                case 2:
                    this.editarPreco(servicoSelecionado);
                    break;
                default:
                    console.log("Opção inválida. Tente novamente.");
                    break;
            }
        }
    }
    editarNome(servico) {
        console.log(`\nServiço selecionado: ${servico.getNome}`);
        const novoNome = this.entrada.receberTexto("Digite o novo nome do serviço: ");
        servico.setNome = novoNome;
        console.log("\n Nome alterado com sucesso! \n ");
    }
    editarPreco(servico) {
        console.log(`\nServiço selecionado: ${servico.getNome}   Preço: R$${servico.getPreco.toFixed(2)}`);
        const novoPreco = this.entrada.receberNumero("Digite o novo preço do serviço: ");
        servico.setPreco = novoPreco;
        console.log(" \n Preço alterado com sucesso! \n");
    }
}
exports.default = EditarServico;
