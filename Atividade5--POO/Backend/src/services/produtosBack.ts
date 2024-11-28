import { AppDataSource } from "../database/database";
import { Produto } from "../entity/produtosEntity";

export class ProdutoService {
    private produtoRepository = AppDataSource.getRepository(Produto);

    // Função para criar um produto
    async createProduto(nome: string, preco: number, quantidade: number): Promise<Produto> {
        const produto = this.produtoRepository.create({ nome, preco, quantidade });
        return await this.produtoRepository.save(produto);
    }

    // Função para buscar todos os produtos
    async getProdutos(): Promise<Produto[]> {
        return await this.produtoRepository.find();
    }

    // Função para buscar um produto pelo id
    async getProdutoById(id: number): Promise<Produto | null> {
        return await this.produtoRepository.findOneBy({ id });
    }

    // Função para atualizar um produto
    async updtateProduto(id: number, nome?: string, preco?: number, quantidade?: number, consumo?: number): Promise<Produto | null> {
        const produto = await this.produtoRepository.findOneBy({ id });

        if (produto) {
            if (nome) produto.nome = nome;
            if (preco) produto.preco = preco;
            if (quantidade) produto.quantidade = quantidade;
            if (consumo !== undefined) produto.consumo = consumo; // Atualizando consumo, se fornecido
        }

        return produto ? await this.produtoRepository.save(produto) : null;
    }

    // Função para deletar um produto
    async deleteProduto(id: number): Promise<boolean> {
        const produto = await this.produtoRepository.findOneBy({ id });

        if (produto) {
            await this.produtoRepository.remove(produto);
            return true;
        }
        return false;
    }

    // Função para atualizar o consumo do produto
    async updateConsumoProdutoeQuantidade(id: number, consumo: number): Promise<Produto | null> {
        const produto = await this.produtoRepository.findOneBy({ id });

        if (produto) {
            produto.consumo = produto.consumo + consumo;
            produto.quantidade = produto.quantidade - consumo;
        }

        return produto ? await this.produtoRepository.save(produto) : null;
    }
}
