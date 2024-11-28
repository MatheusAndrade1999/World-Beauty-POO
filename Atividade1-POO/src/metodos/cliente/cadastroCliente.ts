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

    public cadastrar(): void {
        console.clear();
        const auth = new AuthCliente(this.clientes);
        
        const nome = this.entrada.receberTexto("Nome do cliente: ");
        const nomeSocial = this.entrada.receberTexto("Nome social: ");
        let genero = this.entrada.receberTexto("Gênero (M / F): ");

        while (!auth.autenticarGenero(genero)) {
            console.log("Gênero inválido. Aceito: M ou F");
            genero = this.entrada.receberTexto("Gênero (M / F): ");
        }

        let cpf = this.entrada.receberTexto("CPF: ");
        let cpfEmissao = this.entrada.receberTexto("Data de emissão do CPF (DD/MM/AAAA): ");
        let cpfNaoValido = auth.autenticarCpf(cpf);

        while (cpfNaoValido) {
            console.log("CPF já cadastrado. Insira um novo CPF.");
            cpf = this.entrada.receberTexto("CPF: ");
            cpfEmissao = this.entrada.receberTexto("Data de emissão do CPF: ");
            cpfNaoValido = auth.autenticarCpf(cpf);
        }

        const dataEmissaoCpf = this.formatarData(cpfEmissao);
        const cpfCliente = new CPF(cpf, dataEmissaoCpf);

        const rgs = this.adicionarRgs();

        const telefones = this.adicionarTelefones();

        const cliente = new Cliente(nome, nomeSocial, cpfCliente, genero.toUpperCase(), rgs, telefones);
        this.clientes.push(cliente);
    }

    private formatarData(data: string): Date {
        const [dia, mes, ano] = data.split("/").map(Number);
        return new Date(ano, mes - 1, dia);
    }

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
