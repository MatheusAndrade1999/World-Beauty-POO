import Excluir from "../interfaces/excluir";
import Entrada from "../../entrada";
import ListagemServico from "./listagemServico";
import Servico from "../../modelos/servico";

export default class ExcluirServico extends Excluir {
    private servicos: Servico[];
    private entrada: Entrada;

    constructor(servicos: Servico[]) {
        super();
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public excluir(): void {
        console.clear();
        const listagem = new ListagemServico(this.servicos);
        listagem.listar();

        this.executarExclusao();
    }

    private executarExclusao(): void {
        let execucao = true;

        while (execucao) {
            console.log('\n=== Exclusão de Serviços ===');
            console.log('0 - Sair');
            const opcao = this.entrada.receberNumero('Digite o número do serviço que deseja excluir: ');

            if (opcao === 0) {
                console.log('Saindo...');
                execucao = false;
            } else if (this.validarOpcao(opcao)) {
                this.servicos.splice(opcao - 1, 1);
                console.log('Serviço excluído com sucesso!');
            } else {
                console.log('Serviço não encontrado, tente novamente');
            }
        }
    }

    private validarOpcao(opcao: number): boolean {
        return opcao > 0 && opcao <= this.servicos.length;
    }
}
