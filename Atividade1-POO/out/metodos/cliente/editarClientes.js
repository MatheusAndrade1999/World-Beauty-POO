"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const editar_1 = __importDefault(require("../interfaces/editar"));
const entrada_1 = __importDefault(require("../../entrada"));
const authCliente_1 = __importDefault(require("../middleware/authCliente"));
const cpf_1 = __importDefault(require("../../modelos/cpf"));
class EditarClientes extends editar_1.default {
    constructor(clientes) {
        super();
        this.clientes = clientes;
        this.entrada = new entrada_1.default();
    }
    // Função principal para edição de dados do cliente
    editar() {
        console.clear();
        const auth = new authCliente_1.default(this.clientes);
        // Recebe e autentica o CPF do cliente para edição
        let cpf = this.entrada.receberTexto("CPF do cliente: ");
        const clienteExiste = auth.cpfExiste(cpf);
        if (!clienteExiste) {
            console.log("Cliente não encontrado. Verifique se o CPF foi digitado corretamente.");
            return;
        }
        const cliente = this.clientes.find(cliente => cliente.getCPF.getValor === cpf);
        let continuarEdicao = true;
        while (continuarEdicao) {
            // Menu de opções de edição
            console.log("0 - Sair");
            console.log("1 - Editar nome");
            console.log("2 - Editar nome social");
            console.log("3 - Editar gênero");
            console.log("4 - Editar CPF");
            console.log("5 - Editar RG");
            console.log("6 - Editar telefones");
            const opcao = this.entrada.receberNumero("Digite a opção desejada: ");
            switch (opcao) {
                case 0:
                    continuarEdicao = false;
                    break;
                case 1:
                    // Edição do nome do cliente
                    const novoNome = this.entrada.receberTexto("Novo nome do cliente: ");
                    cliente.setNome = novoNome;
                    break;
                case 2:
                    // Edição do nome social do cliente
                    const novoNomeSocial = this.entrada.receberTexto("Novo nome social: ");
                    cliente.setNomeSocial = novoNomeSocial;
                    break;
                case 3:
                    // Edição e validação do gênero
                    let genero = this.entrada.receberTexto("Novo gênero (M / F): ");
                    while (!auth.autenticarGenero(genero)) {
                        console.log("Gênero inválido. Aceito: M ou F.");
                        genero = this.entrada.receberTexto("Gênero (M / F): ");
                    }
                    cliente.setGenero = genero;
                    break;
                case 4:
                    // Edição e validação do CPF
                    this.editarCpf(cliente, auth);
                    break;
                // Casos adicionais para RG e telefones (não incluídos) podem ser implementados
            }
        }
    }
    // Método para edição e validação de um novo CPF
    editarCpf(cliente, auth) {
        let cpf = this.entrada.receberTexto("Novo CPF: ");
        let cpfEmissao = this.entrada.receberTexto("Nova data de emissão do CPF (DD/MM/AAAA): ");
        let cpfNaoValido = auth.autenticarCpf(cpf);
        // Valida CPF até ser único
        while (cpfNaoValido) {
            console.log("CPF já cadastrado. Insira um novo CPF.");
            cpf = this.entrada.receberTexto("CPF: ");
            cpfEmissao = this.entrada.receberTexto("Data de emissão do CPF: ");
            cpfNaoValido = auth.autenticarCpf(cpf);
        }
        const dataEmissaoCpf = this.formatarData(cpfEmissao);
        cliente.setCPF = new cpf_1.default(cpf, dataEmissaoCpf);
    }
    // Função auxiliar para formatar data de entrada (DD/MM/AAAA) em objeto Date
    formatarData(data) {
        const [dia, mes, ano] = data.split("/").map(Number);
        return new Date(ano, mes - 1, dia); // Ajuste de mês para objeto Date
    }
}
exports.default = EditarClientes;
