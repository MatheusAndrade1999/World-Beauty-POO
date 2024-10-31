export default class RG {
    private valor: string;
    private dataEmissao: Date;

    constructor(valor: string, dataEmissao: Date) {
        this.setValor(valor);
        this.setDataEmissao(dataEmissao);
    }

    // Retorna o valor do RG
    public get getValor(): string {
        return this.valor;
    }

    // Retorna a data de emissão do RG
    public get getDataEmissao(): Date {
        return this.dataEmissao;
    }

    // Atualiza o valor do RG
    public setValor(valor: string): void {
        // Adicione sua validação de formato aqui
        if (valor.trim() === "") {
            throw new Error("O valor do RG não pode ser vazio.");
        }
        this.valor = valor;
    }

    // Atualiza a data de emissão do RG
    public setDataEmissao(dataEmissao: Date): void {
        const hoje = new Date();
        if (dataEmissao > hoje) {
            throw new Error("A data de emissão não pode ser no futuro.");
        }
        this.dataEmissao = dataEmissao;
    }
}
