import Entrada from "../../entrada";
import Produto from "../../modelos/produto";
import Editar from "../interfaces/editar";
import AuthProduto from "../middleware/authProdutos";
import ListagemProdutos from "./listagemProduto";

export default class EditarProduto extends Editar {
    private produtos: Produto[];
    private entrada: Entrada;

    constructor(produtos: Produto[]) {
        super();
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public editar(): void {
        console.clear();

        const auth = new AuthProduto(this.produtos);
        const listagem = new ListagemProdutos(this.produtos);
        listagem.listar();

        const id = this.entrada.receberNumero("Digite o número do produto que deseja editar: ");
        const produtoSelecionado = this.produtos[id - 1];

        if (!produtoSelecionado) {
            console.log("Produto não encontrado.");
            return;
        }

        let execucao = true;

        while (execucao) {
            console.log("0 - Sair");
            console.log("1 - Editar nome");
            console.log("2 - Editar preço");

            const opcao = this.entrada.receberNumero("Digite a opção desejada: ");

            switch (opcao) {
                case 0:
                    console.log("Saindo...");
                    execucao = false;
                    break;

                case 1:
                    const novoNome = this.entrada.receberTexto("Digite o novo nome do produto: ");
                    produtoSelecionado.setNome = novoNome;
                    console.log("\nNome alterado com sucesso!\n");
                    break;

                case 2:
                    const novoPreco = this.entrada.receberNumero("Digite o novo preço do produto: ");
                    produtoSelecionado.setPreco = novoPreco;
                    console.log("Preço alterado com sucesso!\n");
                    break;

                default:
                    console.log("Opção inválida. Tente novamente.");
                    break;
            }
        }
    }
}
