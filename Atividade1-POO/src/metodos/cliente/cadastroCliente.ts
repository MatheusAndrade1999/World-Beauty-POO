import Cadastro from "../interfaces/cadastro";
import Cliente from "../../modelos/cliente";
import CPF from "../../modelos/cpf";
import RG from "../../modelos/rg";
import Entrada from "../../entrada";
import AuthCliente from "../middleware/authCliente";
import Telefone from "../../modelos/telefone";

export default class CadastroCliente extends Cadastro {
    private clientes: Cliente[];
    private entrada: Entrada;

    constructor(clientes: Cliente[]) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    // Função principal para cadastro de cliente
    public cadastrar(): void {
        console.clear();
        const auth = new AuthCliente(this.clientes); // Autenticação do cliente
        
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
        const cpfCliente = new CPF(cpf, dataEmissaoCpf);

        // Adiciona os RGs ao cliente
        const rgs = this.adicionarRgs();

        // Adiciona os telefones ao cliente
        const telefones = this.adicionarTelefones();

        // Criação e adição do cliente
        const cliente = new Cliente(nome, nomeSocial, cpfCliente, genero.toUpperCase(), rgs, telefones);
        this.clientes.push(cliente);
    }

    // Método auxiliar para formatar data a partir de uma string DD/MM/AAAA
    private formatarData(data: string): Date {
        const [dia, mes, ano] = data.split("/").map(Number);
        return new Date(ano, mes - 1, dia); // Ajusta o mês para Date
    }

    // Método para adicionar RGs ao cliente
    private adicionarRgs(): RG[] {
        const rgs: RG[] = [];
        let adicionarOutro = true;

        while (adicionarOutro) {
            const rg = this.entrada.receberTexto("RG: ");
            const rgEmissao = this.entrada.receberTexto("Data de emissão do RG (DD/MM/AAAA): ");
            const dataEmissao = this.formatarData(rgEmissao);
            rgs.push(new RG(rg, dataEmissao));

            const opcao = this.entrada.receberTexto("Deseja adicionar mais um RG? (S / N): ");
            adicionarOutro = opcao.toUpperCase() === "S";
        }

        return rgs;
    }

    // Método para adicionar telefones ao cliente
    private adicionarTelefones(): Telefone[] {
        const telefones: Telefone[] = [];
        let adicionarOutro = true;

        while (adicionarOutro) {
            const ddd = this.entrada.receberTexto("DDD: ");
            const numero = this.entrada.receberTexto("Número: ");
            telefones.push(new Telefone(ddd, numero));

            const opcao = this.entrada.receberTexto("Deseja adicionar mais um telefone? (S / N): ");
            adicionarOutro = opcao.toUpperCase() !== "N";
        }

        return telefones;
    }
}
