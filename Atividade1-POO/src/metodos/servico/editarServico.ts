import Entrada from "../../entrada";
import Servico from "../../modelos/servico";
import Editar from "../interfaces/editar";
import AuthServico from "../middleware/authServicos";
import ListagemServico from "./listagemServico";

export default class EditarServico extends Editar {
    private servicos: Servico[];
    private entrada: Entrada;

    constructor(servicos: Servico[]) {
        super();
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public editar(): void {
        console.clear();
        const auth = new AuthServico(this.servicos);
        const listagem = new ListagemServico(this.servicos);
        
        listagem.listar();
        const id = this.entrada.receberNumero("Digite o número do serviço que deseja editar: ");
        
        if (this.servicos[id - 1]) {
            this.executarEdicao(id - 1);
        } else {
            console.log("Serviço não encontrado.");
        }
    }

    private executarEdicao(index: number): void {
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

    private editarNome(servico: Servico): void {
        console.log(`\nServiço selecionado: ${servico.getNome}`);
        const novoNome = this.entrada.receberTexto("Digite o novo nome do serviço: ");
        servico.setNome = novoNome;
        console.log("\n Nome alterado com sucesso! \n ");
    }

    private editarPreco(servico: Servico): void {
        console.log(`\nServiço selecionado: ${servico.getNome}   Preço: R$${servico.getPreco.toFixed(2)}`);
        const novoPreco = this.entrada.receberNumero("Digite o novo preço do serviço: ");
        servico.setPreco = novoPreco;
        console.log(" \n Preço alterado com sucesso! \n");
    }
}
