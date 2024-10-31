import Entrada from "../../entrada";
import Servico from "../../modelos/servico";
import Produto from "../../modelos/produto";
import Cliente from "../../modelos/cliente";

export default class ServicosProdutosGenero {
    
    private produtos: Produto[];
    private clientes: Cliente[];
    private servicos: Servico[];
    private entrada: Entrada;

    constructor(clientes: Cliente[], produtos: Produto[], servicos: Servico[]) {
        this.produtos = produtos;
        this.servicos = servicos;
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    // Método genérico para listar produtos ou serviços por gênero
    private listarMaisConsumidosPorGenero(itens: { getNome: string; getConsumo: number }[], genero: string): void {
        console.clear();
        const clientesGenero = this.clientes.filter(cliente => cliente.getGenero === genero);
        const itensConsumidos = itens.filter(item => 
            clientesGenero.some(cliente => 
                cliente.getProdutosConsumidos.some(consumo => consumo.getNome === item.getNome)
            )
        ).sort((a, b) => b.getConsumo - a.getConsumo);
        
        itensConsumidos.forEach(item => {
            console.log(`Nome: ${item.getNome} - Vezes consumido: ${item.getConsumo}`);
        });

        this.aguardarContinuacao();
    }

    public listarProdutosMasculino(): void {
        console.log("=== Listagem dos produtos mais consumidos por gênero masculino ===\n");
        this.listarMaisConsumidosPorGenero(this.produtos, "M");
    }

    public listarServicosMasculino(): void {
        console.log("=== Listagem dos serviços mais consumidos por gênero masculino ===\n");
        this.listarMaisConsumidosPorGenero(this.servicos, "M");
    }

    public listarProdutosFeminino(): void {
        console.log("=== Listagem dos produtos mais consumidos por gênero feminino ===\n");
        this.listarMaisConsumidosPorGenero(this.produtos, "F");
    }

    public listarServicosFeminino(): void {
        console.log("=== Listagem dos serviços mais consumidos por gênero feminino ===\n");
        this.listarMaisConsumidosPorGenero(this.servicos, "F");
    }

    public listarServicosProdutosGenero(): void {
        let execucao = true;
        
        while (execucao) {
            console.clear();
            console.log("=== Listar serviços ou produtos mais consumidos por gênero ===\n");
            console.log("1 - Produtos");
            console.log("2 - Serviços");
            console.log("3 - Sair");
            
            const opcao = this.entrada.receberNumero("Digite a opção desejada: ");
            
            switch (opcao) {
                case 1:
                    this.exibirMenuGenero(() => this.listarProdutosMasculino(), () => this.listarProdutosFeminino());
                    break;

                case 2:
                    this.exibirMenuGenero(() => this.listarServicosMasculino(), () => this.listarServicosFeminino());
                    break;

                case 3:
                    execucao = false;
                    break;

                default:
                    console.log("Opção inválida, tente novamente.");
                    break;
            }
        }
    }

    // Método para exibir o menu de gênero e listar produtos ou serviços
    private exibirMenuGenero(callbackMasculino: () => void, callbackFeminino: () => void): void {
        let execucaoGenero = true;
        
        while (execucaoGenero) {
            console.clear();
            console.log("=== Escolha o gênero ===\n");
            console.log("1 - Masculino");
            console.log("2 - Feminino");
            console.log("3 - Voltar");
            
            const opcao = this.entrada.receberNumero("Digite a opção desejada: ");
            
            switch (opcao) {
                case 1:
                    callbackMasculino();
                    break;

                case 2:
                    callbackFeminino();
                    break;

                case 3:
                    execucaoGenero = false;
                    break;

                default:
                    console.log("Opção inválida, tente novamente.");
                    break;
            }
        }
    }

    private aguardarContinuacao(): void {
        this.entrada.receberTexto("\nPressione enter para continuar");
    }
}
