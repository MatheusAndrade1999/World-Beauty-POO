import Produto from "../../modelos/produto";

export default class AuthProduto {

    private produtos: Produto[];

    constructor(produtos: Produto[]) {
        this.produtos = produtos;
    }

    // Método para verificar a existência de um produto pelo nome
    public autenticarProduto(nomeProduto: string): boolean {
        return this.produtos.some(produto => produto.getNome === nomeProduto);
    }
}
