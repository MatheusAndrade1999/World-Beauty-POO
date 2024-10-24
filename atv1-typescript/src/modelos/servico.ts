export default class Servico {
    private nome: string;
    private preco: number;
    private consumido: number;

    constructor(nome: string, preco: number, consumido: number){
        this.nome = nome;
        this.preco = preco;
        this.consumido = consumido;
    }

    public getNome(): string{
        return this.nome;
    }

    public getPreco(): number{
        return this.preco;
    }

    public getConsumido(): number{
        return this.consumido;
    }

    public setNome(nome: string): void{
        this.nome = nome;
    }

    public setPreco(preco: number): void{
        this.preco = preco;
    }

    public setConsumido(consumido: number): void{
        this.consumido = consumido;
    }

}