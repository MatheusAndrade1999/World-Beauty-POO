import AuthProduto from "../middleware/authProdutos";
import Produto from "../../modelos/produto";
import Entrada from "../../entrada";
import Cadastro from "../interfaces/cadastro";

export default class CadastrarProduto extends Cadastro {
    private produtos: Produto[];
    private entrada: Entrada;

    constructor(produtos: Produto[]) {
        super();
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.clear();

        // Variável para autenticação do produto
        const auth = new AuthProduto(this.produtos);

        // Variáveis para armazenar os dados do produto
        let nome = this.entrada.receberTexto("Nome do produto: ");
        
        // Loop para verificar se o nome do produto já está cadastrado
        while (auth.autenticarProduto(nome)) {
            console.log("Produto já cadastrado. Tente novamente.");
            nome = this.entrada.receberTexto("Nome do produto: ");
        }

        const preco = this.entrada.receberNumero("Preço do produto: ");
        const produto = new Produto(nome, preco);
        
        this.produtos.push(produto);
        console.log("Produto cadastrado com sucesso!");
    }
}
