import Editar from "../interfaces/editar";
import Cliente from "../../modelos/cliente";
import Entrada from "../../entrada";
import AuthCliente from "../middleware/authCliente";
import CPF from "../../modelos/cpf";
import RG from "../../modelos/rg";

export default class EditarClientes extends Editar {
    private clientes: Cliente[];
    private entrada: Entrada;

    constructor(clientes: Cliente[]) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public editar(): void {
        console.clear();
        const auth = new AuthCliente(this.clientes);

        let cpf = this.entrada.receberTexto("CPF do cliente: ");
        const clienteExiste = auth.cpfExiste(cpf);

        if (!clienteExiste) {
            console.log("Cliente não encontrado. Verifique se o CPF foi digitado corretamente.");
            return;
        }

        const cliente = this.clientes.find(cliente => cliente.getCPF.getValor === cpf);
        let continuarEdicao = true;

        while (continuarEdicao) {
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
                    const novoNome = this.entrada.receberTexto("Novo nome do cliente: ");
                    cliente.setNome = novoNome;
                    break;

                case 2:
                    const novoNomeSocial = this.entrada.receberTexto("Novo nome social: ");
                    cliente.setNomeSocial = novoNomeSocial;
                    break;

                case 3:
                    let genero = this.entrada.receberTexto("Novo gênero (M / F): ");
                    while (!auth.autenticarGenero(genero)) {
                        console.log("Gênero inválido. Aceito: M ou F.");
                        genero = this.entrada.receberTexto("Gênero (M / F): ");
                    }
                    cliente.setGenero = genero;
                    break;

                case 4:
                    this.editarCpf(cliente, auth);
                    break;
            }
        }
    }

    private editarCpf(cliente: Cliente, auth: AuthCliente): void {
        let cpf = this.entrada.receberTexto("Novo CPF: ");
        let cpfEmissao = this.entrada.receberTexto("Nova data de emissão do CPF (DD/MM/AAAA): ");
        let cpfNaoValido = auth.autenticarCpf(cpf);

        while (cpfNaoValido) {
            console.log("CPF já cadastrado. Insira um novo CPF.");
            cpf = this.entrada.receberTexto("CPF: ");
            cpfEmissao = this.entrada.receberTexto("Data de emissão do CPF: ");
            cpfNaoValido = auth.autenticarCpf(cpf);
        }

        const dataEmissaoCpf = this.formatarData(cpfEmissao);
        cliente.setCPF = new CPF(cpf, dataEmissaoCpf);
    }

    private formatarData(data: string): Date {
        const [dia, mes, ano] = data.split("/").map(Number);
        return new Date(ano, mes - 1, dia);
    }
}
