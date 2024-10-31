"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Telefone {
    constructor(ddd, numero) {
        this.setDdd(ddd);
        this.setNumero(numero);
    }
    // Retorna o DDD
    get getDdd() {
        return this.ddd;
    }
    // Retorna o número
    get getNumero() {
        return this.numero;
    }
    // Define o DDD com validação
    setDdd(ddd) {
        if (!/^\d{2}$/.test(ddd)) {
            throw new Error("DDD inválido. Deve conter 2 dígitos.");
        }
        this.ddd = ddd;
    }
    // Define o número com validação
    setNumero(numero) {
        if (!/^\d{8,9}$/.test(numero)) {
            throw new Error("Número inválido. Deve conter entre 8 e 9 dígitos.");
        }
        this.numero = numero;
    }
    // Exibe o telefone formatado
    formatarTelefone() {
        return `(${this.ddd}) ${this.numero.slice(0, this.numero.length - 4)}-${this.numero.slice(-4)}`;
    }
}
exports.default = Telefone;
