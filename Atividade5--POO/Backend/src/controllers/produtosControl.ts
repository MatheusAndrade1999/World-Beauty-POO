import { Request, Response } from "express";
import { ProdutoService } from "../services/produtosBack";

const produtoService = new ProdutoService();

export const createProdutoControl = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nome, preco, quantidade } = req.body;
        const produto = await produtoService.createProduto(nome, preco, quantidade);
        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getProdutosControl = async (req: Request, res: Response): Promise<void> => {
    try {
        const produtos = await produtoService.getProdutos();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getProdutoByIdControl = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const produto = await produtoService.getProdutoById(Number(id));
        res.status(200).json(produto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updtateProdutoControl = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { nome, preco, quantidade, consumo } = req.body;

        const produto = await produtoService.updtateProduto(Number(id), nome, preco, quantidade, consumo);

        if (produto) {
            res.status(200).json(produto);
        } else {
            res.status(404).json({ message: 'Produto não encontrado!' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteProdutoControl = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const produtoExcluido = await produtoService.deleteProduto(Number(id));

        if (produtoExcluido) {
            res.status(200).json({ message: 'Produto excluído com sucesso!' });
        } else {
            res.status(404).json({ message: 'Produto não encontrado!' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
