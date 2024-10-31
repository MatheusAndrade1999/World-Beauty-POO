import Cliente from "../../modelos/cliente";
import Listagem from "../interfaces/listagem";
import Entrada from "../../entrada";

export default class ListarPedidosProdutos extends Listagem {
    private clientes: Cliente[];
    private entrada: Entrada;

    constructor(clientes: Cliente[]) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public listar(): void {
        console.clear();
        let executar = true;

        console.log("=== Listar Pedidos de Produtos ===\n");
        const cpfCliente = this.entrada.receberTexto("Digite o CPF do cliente: ").trim();
        const cliente = this.clientes.find(cliente => cliente.getCPF.getValor === cpfCliente);

        if (cliente) {
            console.log("\nProdutos consumidos pelo cliente:");
            cliente.getProdutosConsumidos.forEach(produto => {
                console.log(`Nome: ${produto.getNome} - Preço: ${produto.getPreco}`);
            });
        } else {
            console.log("Cliente não encontrado. Verifique se o CPF existe ou se foi digitado corretamente.");
        }

        while (executar) {
            const opcao = this.entrada.receberTexto("\nPressione enter para continuar");
            switch (opcao) {
                default:
                    executar = false;
                    break;
            }
        }
    }

    public listarProdutosMaisPedidos(): void {
        console.clear();
        // Aqui você pode implementar a lógica para listar os produtos mais pedidos
        console.log("Em desenvolvimento...");
    }
}
