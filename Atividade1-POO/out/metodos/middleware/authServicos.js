"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthServico {
    constructor(servicos) {
        this.servicos = servicos;
    }
    // Método para verificar a existência de um serviço pelo nome
    autenticarServico(nomeServico) {
        return this.servicos.some(servico => servico.getNome === nomeServico);
    }
}
exports.default = AuthServico;
