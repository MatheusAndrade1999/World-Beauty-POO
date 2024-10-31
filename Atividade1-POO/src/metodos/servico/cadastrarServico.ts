import Cadastro from "../interfaces/cadastro";
import Servico from "../../modelos/servico";
import Entrada from "../../entrada";
import AuthServico from "../middleware/authServicos";

export default class CadastrarServico extends Cadastro {
    private servicos: Servico[];
    private entrada: Entrada;

    constructor(servicos: Servico[]) {
        super();
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.clear();

        const auth = new AuthServico(this.servicos);
        let nome = this.obterNomeServico(auth);

        const preco = this.entrada.receberNumero("Preço do serviço: ");
        const servico = new Servico(nome, preco);

        this.servicos.push(servico);
        console.log("Serviço cadastrado com sucesso!");
    }

    private obterNomeServico(auth: AuthServico): string {
        let nome = this.entrada.receberTexto("Nome do serviço: ");
        
        while (auth.autenticarServico(nome)) {
            console.log("Serviço já cadastrado");
            nome = this.entrada.receberTexto("Nome do serviço: ");
        }

        return nome;
    }
}
