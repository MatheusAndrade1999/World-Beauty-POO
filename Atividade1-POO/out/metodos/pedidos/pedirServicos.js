"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pedir_1 = __importDefault(require("../interfaces/pedir"));
const authCliente_1 = __importDefault(require("../middleware/authCliente"));
const entrada_1 = __importDefault(require("../../entrada"));
const listagemServico_1 = __importDefault(require("../servico/listagemServico"));
class PedirServico extends pedir_1.default {
    constructor(clientes, servicos, empresa) {
        super();
        this.entrada = new entrada_1.default();
        this.clientes = clientes;
        this.servicos = servicos;
        this.empresa = empresa;
    }
    pedir() {
        console.clear();
        const auth_cliente = new authCliente_1.default(this.clientes);
        console.log("=== Pedir Serviço ===\n");
        const cpf_cliente = this.entrada.receberTexto("Digite o CPF do cliente: ");
        const autenticacao = auth_cliente.cpfExiste(cpf_cliente);
        if (!autenticacao) {
            console.log("Cliente não encontrado, verifique se o CPF existe ou se foi digitado corretamente.");
            return;
        }
        else {
            let executar = true;
            const cliente = this.clientes.find(cliente => cliente.getCPF.getValor === cpf_cliente);
            const listagem = new listagemServico_1.default(this.servicos);
            listagem.listar();
            while (executar) {
                let id_servico = this.entrada.receberNumero("Digite o número do serviço que vai ser atribuído: ");
                // Validação do índice do serviço
                if (id_servico < 1 || id_servico > this.servicos.length) {
                    console.log("Serviço inválido. Por favor, tente novamente.");
                    continue;
                }
                const servico_selecionado = this.servicos[id_servico - 1];
                cliente.setServicoConsumido = servico_selecionado;
                cliente.setGastos = servico_selecionado.getPreco + cliente.getGastos;
                servico_selecionado.setConsumo = servico_selecionado.getConsumo + 1;
                console.log("Serviço adicionado com sucesso!");
                const resposta = this.entrada.receberTexto("Deseja adicionar mais serviços? (s/n): ");
                executar = resposta.toLowerCase() === "s";
            }
        }
    }
}
exports.default = PedirServico;
