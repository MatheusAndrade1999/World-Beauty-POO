"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cadastro_1 = __importDefault(require("../interfaces/cadastro"));
const cliente_1 = __importDefault(require("../../modelos/cliente"));
const cpf_1 = __importDefault(require("../../modelos/cpf"));
const rg_1 = __importDefault(require("../../modelos/rg"));
const entrada_1 = __importDefault(require("../../entrada"));
const authCliente_1 = __importDefault(require("../middleware/authCliente"));
const telefone_1 = __importDefault(require("../../modelos/telefone"));
class CadastroCliente extends cadastro_1.default {
    constructor(clientes) {
        super();
        this.clientes = clientes;
        this.entrada = new entrada_1.default();
    }
    // Função principal para cadastro de cliente
    cadastrar() {
        console.clear();
        const auth = new authCliente_1.default(this.clientes); // Autenticação do cliente
        // Captura de dados principais do cliente
        const nome = this.entrada.receberTexto("Nome do cliente: ");
        const nomeSocial = this.entrada.receberTexto("Nome social: ");
        let genero = this.entrada.receberTexto("Gênero (M / F): ");
        // Validação do gênero
        while (!auth.autenticarGenero(genero)) {
            console.log("Gênero inválido. Aceito: M ou F");
            genero = this.entrada.receberTexto("Gênero (M / F): ");
        }
        // Coleta e validação do CPF
        let cpf = this.entrada.receberTexto("CPF: ");
        let cpfEmissao = this.entrada.receberTexto("Data de emissão do CPF (DD/MM/AAAA): ");
        let cpfNaoValido = auth.autenticarCpf(cpf);
        // Confere o CPF e verifica se já existe
        while (cpfNaoValido) {
            console.log("CPF já cadastrado. Insira um novo CPF.");
            cpf = this.entrada.receberTexto("CPF: ");
            cpfEmissao = this.entrada.receberTexto("Data de emissão do CPF: ");
            cpfNaoValido = auth.autenticarCpf(cpf);
        }
        // Formata a data de emissão do CPF
        const dataEmissaoCpf = this.formatarData(cpfEmissao);
        const cpfCliente = new cpf_1.default(cpf, dataEmissaoCpf);
        // Adiciona os RGs ao cliente
        const rgs = this.adicionarRgs();
        // Adiciona os telefones ao cliente
        const telefones = this.adicionarTelefones();
        // Criação e adição do cliente
        const cliente = new cliente_1.default(nome, nomeSocial, cpfCliente, genero.toUpperCase(), rgs, telefones);
        this.clientes.push(cliente);
    }
    // Método auxiliar para formatar data a partir de uma string DD/MM/AAAA
    formatarData(data) {
        const [dia, mes, ano] = data.split("/").map(Number);
        return new Date(ano, mes - 1, dia); // Ajusta o mês para Date
    }
    // Método para adicionar RGs ao cliente
    adicionarRgs() {
        const rgs = [];
        let adicionarOutro = true;
        while (adicionarOutro) {
            const rg = this.entrada.receberTexto("RG: ");
            const rgEmissao = this.entrada.receberTexto("Data de emissão do RG (DD/MM/AAAA): ");
            const dataEmissao = this.formatarData(rgEmissao);
            rgs.push(new rg_1.default(rg, dataEmissao));
            const opcao = this.entrada.receberTexto("Deseja adicionar mais um RG? (S / N): ");
            adicionarOutro = opcao.toUpperCase() === "S";
        }
        return rgs;
    }
    // Método para adicionar telefones ao cliente
    adicionarTelefones() {
        const telefones = [];
        let adicionarOutro = true;
        while (adicionarOutro) {
            const ddd = this.entrada.receberTexto("DDD: ");
            const numero = this.entrada.receberTexto("Número: ");
            telefones.push(new telefone_1.default(ddd, numero));
            const opcao = this.entrada.receberTexto("Deseja adicionar mais um telefone? (S / N): ");
            adicionarOutro = opcao.toUpperCase() !== "N";
        }
        return telefones;
    }
}
exports.default = CadastroCliente;
