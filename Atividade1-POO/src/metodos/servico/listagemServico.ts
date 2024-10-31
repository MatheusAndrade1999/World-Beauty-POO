import Listagem from "../interfaces/listagem";
import Servico from "../../modelos/servico";
import Entrada from "../../entrada";

export default class ListagemServico extends Listagem {
    private servicos: Servico[];
    private entrada: Entrada;

    constructor(servicos: Servico[]) {
        super();
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public listar(): void {
        console.clear();
        console.log('\nListagem de Serviços');
        console.log('=====================');
        this.mostrarServicos();

        this.aguardarSaida();
    }

    private mostrarServicos(): void {
        this.servicos.forEach((servico, index) => {
            console.log(` ${index + 1} - Serviço: ${servico.getNome} | Preço: R$ ${servico.getPreco.toFixed(2)}`);
            console.log(`\n`);
        });
    }

    private aguardarSaida(): void {
        let execucao = true;
        while (execucao) {
            const opcao = this.entrada.receberNumero('Aperte qualquer tecla para sair: ');
            execucao = false; // Saída garantida após pressionar uma tecla
        }
    }
}
