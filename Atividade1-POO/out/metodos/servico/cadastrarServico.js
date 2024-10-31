"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cadastro_1 = __importDefault(require("../interfaces/cadastro"));
const servico_1 = __importDefault(require("../../modelos/servico"));
const entrada_1 = __importDefault(require("../../entrada"));
const authServicos_1 = __importDefault(require("../middleware/authServicos"));
class CadastrarServico extends cadastro_1.default {
    constructor(servicos) {
        super();
        this.servicos = servicos;
        this.entrada = new entrada_1.default();
    }
    cadastrar() {
        console.clear();
        const auth = new authServicos_1.default(this.servicos);
        let nome = this.obterNomeServico(auth);
        const preco = this.entrada.receberNumero("Preço do serviço: ");
        const servico = new servico_1.default(nome, preco);
        this.servicos.push(servico);
        console.log("Serviço cadastrado com sucesso!");
    }
    obterNomeServico(auth) {
        let nome = this.entrada.receberTexto("Nome do serviço: ");
        while (auth.autenticarServico(nome)) {
            console.log("Serviço já cadastrado");
            nome = this.entrada.receberTexto("Nome do serviço: ");
        }
        return nome;
    }
}
exports.default = CadastrarServico;
