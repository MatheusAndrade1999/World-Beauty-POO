export default class RG {
    private valor: string;
    private dataEmissao: Date;

    constructor(valor: string, dataEmissao: Date){
        this.valor = valor;
        this.dataEmissao = dataEmissao;
    }

    public getValor(): string{
        return this.valor;
    }

    public getDataEmissao(): Date{
        return this.dataEmissao;
    }

    
}