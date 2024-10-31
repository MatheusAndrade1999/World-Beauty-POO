"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RG {
    constructor(valor, dataEmissao) {
        this.setValor(valor);
        this.setDataEmissao(dataEmissao);
    }
    // Retorna o valor do RG
    get getValor() {
        return this.valor;
    }
    // Retorna a data de emissão do RG
    get getDataEmissao() {
        return this.dataEmissao;
    }
    // Atualiza o valor do RG
    setValor(valor) {
        // Adicione sua validação de formato aqui
        if (valor.trim() === "") {
            throw new Error("O valor do RG não pode ser vazio.");
        }
        this.valor = valor;
    }
    // Atualiza a data de emissão do RG
    setDataEmissao(dataEmissao) {
        const hoje = new Date();
        if (dataEmissao > hoje) {
            throw new Error("A data de emissão não pode ser no futuro.");
        }
        this.dataEmissao = dataEmissao;
    }
}
exports.default = RG;
