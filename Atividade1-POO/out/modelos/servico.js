"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Servico {
    constructor(nome, preco) {
        this.setNome = nome;
        this.setPreco = preco;
        this.consumo = 0; // Inicializa o consumo como zero
    }
    // Retorna o nome do serviço
    get getNome() {
        return this.nome;
    }
    // Retorna o preço do serviço
    get getPreco() {
        return this.preco;
    }
    // Define o nome do serviço com validação
    set setNome(nome) {
        if (!nome.trim()) {
            throw new Error("O nome do serviço não pode ser vazio.");
        }
        this.nome = nome;
    }
    // Define o preço do serviço com validação
    set setPreco(preco) {
        if (preco < 0) {
            throw new Error("O preço não pode ser negativo.");
        }
        this.preco = preco;
    }
    // Retorna o consumo do serviço
    get getConsumo() {
        return this.consumo;
    }
    // Define o consumo do serviço com validação
    set setConsumo(consumo) {
        if (consumo < 0) {
            throw new Error("O consumo não pode ser negativo.");
        }
        this.consumo = consumo;
    }
    // Aumenta o consumo do serviço
    aumentarConsumo(valor) {
        if (valor < 0) {
            throw new Error("O valor a ser adicionado ao consumo não pode ser negativo.");
        }
        this.consumo += valor;
    }
    // Diminui o consumo do serviço
    diminuirConsumo(valor) {
        if (valor < 0) {
            throw new Error("O valor a ser subtraído do consumo não pode ser negativo.");
        }
        this.consumo = Math.max(0, this.consumo - valor); // Garante que o consumo não fique negativo
    }
}
exports.default = Servico;
