"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthProduto {
    constructor(produtos) {
        this.produtos = produtos;
    }
    // Método para verificar a existência de um produto pelo nome
    autenticarProduto(nomeProduto) {
        return this.produtos.some(produto => produto.getNome === nomeProduto);
    }
}
exports.default = AuthProduto;
