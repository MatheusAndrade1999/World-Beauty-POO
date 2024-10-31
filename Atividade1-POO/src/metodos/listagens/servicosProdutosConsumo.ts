import Entrada from "../../entrada";
import Produto from "../../modelos/produto";
import Servico from "../../modelos/servico";

export default class ServicosProdutosConsumo {
    private produtos: Produto[];
    private servicos: Servico[];
    private entrada: Entrada;

    constructor(produtos: Produto[], servicos: Servico[]) {
        this.produtos = produtos;
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public listarProdutoServicoMaisConsumido(): void {
        console.clear();
        let execucao = true;

        while (execucao) {
            console.log("=== Listar serviços ou produtos mais consumidos ===\n");
            console.log("1 - Produtos");
            console.log("2 - Serviços");
            console.log("3 - Sair");

            const opcao = this.entrada.receberNumero("Digite a opção desejada: ");

            switch (opcao) {
                case 1:
                    console.log("\n=== Listagem dos produtos mais consumidos ===\n");
                    this.listarMaisConsumidos(this.produtos);
                    break;

                case 2:
                    console.log("\n=== Listagem dos serviços mais consumidos ===\n");
                    this.listarMaisConsumidos(this.servicos);
                    break;

                case 3:
                    execucao = false;
                    break;

                default:
                    console.log("Opção inválida");
                    break;
            }
        }
    }

    private listarMaisConsumidos(itens: { getNome: string; getConsumo: number }[]): void {
        const itensOrdenados = itens.sort((a, b) => b.getConsumo - a.getConsumo);

        itensOrdenados.forEach(item => {
            console.log(`Nome: ${item.getNome} - Vezes consumido: ${item.getConsumo}`);
        });

        this.aguardarContinuacao();
    }

    private aguardarContinuacao(): void {
        this.entrada.receberTexto("\nPressione enter para continuar");
    }
}
