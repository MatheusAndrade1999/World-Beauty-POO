"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Servico {
    constructor(nome, preco) {
        this.nome = nome;
        this.preco = preco;
        this.consumo = 0;
    }
    get getNome() {
        return this.nome;
    }
    get getPreco() {
        return this.preco;
    }
    set setNome(nome) {
        this.nome = nome;
    }
    set setPreco(preco) {
        this.preco = preco;
    }
    get getConsumo() {
        return this.consumo;
    }
    set setConsumo(consumo) {
        this.consumo = consumo;
    }
}
exports.default = Servico;
