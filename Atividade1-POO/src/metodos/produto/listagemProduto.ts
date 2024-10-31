import Produto from "../../modelos/produto";
import Listagem from "../interfaces/listagem";
import Entrada from "../../entrada";

export default class ListagemProdutos extends Listagem {
    private produtos: Produto[];
    private entrada: Entrada;

    constructor(produtos: Produto[]) {
        super();
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public listar(): void {
        console.clear();
        console.log('\nListagem de Produtos');
        console.log('=====================');

        this.produtos.forEach((produto, index) => {
            console.log(` ${index + 1} - Produto: ${produto.getNome} | Preço: R$ ${produto.getPreco.toFixed(2)}`);
            console.log('\n');
        });

        this.aguardarSaida();
    }

    private aguardarSaida(): void {
        let execucao = true;
        while (execucao) {
            const opcao = this.entrada.receberNumero('Aperte qualquer tecla para sair: ');
            execucao = false; // A opção aqui não está sendo utilizada, o loop simplesmente termina
        }
    }
}
