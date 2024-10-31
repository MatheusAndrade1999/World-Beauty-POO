"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cliente {
    constructor() {
        this.produtosConsumidos = [];
        this.servicosConsumidos = [];
    }
    connstructor(nome, nomeSocial, cpf, genero, rgs, dataCadastro, telefones) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.cpf = cpf;
        this.genero = genero;
        this.rgs = rgs;
        this.dataCadastro = dataCadastro;
        this.telefones = telefones;
    }
    // Getters
    getNome() {
        return this.nome;
    }
    getNomeSocial() {
        return this.nomeSocial;
    }
    getCPF() {
        return this.cpf;
    }
    getGenero() {
        return this.genero;
    }
    getRgs() {
        return this.rgs;
    }
    getDataCadastro() {
        return this.dataCadastro;
    }
    getTelefones() {
        return this.telefones;
    }
    getProdutosConsumidos() {
        return this.produtosConsumidos;
    }
    getServicosConsumidos() {
        return this.servicosConsumidos;
    }
    getGastos() {
        return this.gastos;
    }
    // Setters
    setNome(nome) {
        this.nome = nome;
    }
    setNomeSocial(nomeSocial) {
        this.nomeSocial = nomeSocial;
    }
    setCPF(cpf) {
        this.cpf = cpf;
    }
    setGenero(genero) {
        this.genero = genero;
    }
    setRgs(rgs) {
        this.rgs = rgs;
    }
    setDataCadastro(dataCadastro) {
        this.dataCadastro = dataCadastro;
    }
    setTelefones(telefones) {
        this.telefones = telefones;
    }
    setProdutosConsumidos(produtosConsumidos) {
        this.produtosConsumidos = produtosConsumidos;
    }
    setServicosConsumidos(servicosConsumidos) {
        this.servicosConsumidos = servicosConsumidos;
    }
    setGastos(gastos) {
        this.gastos = gastos;
    }
}
exports.default = Cliente;
