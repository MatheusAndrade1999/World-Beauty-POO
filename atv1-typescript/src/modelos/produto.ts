export default class Produto {
    private nome: string;
    private preco: number;

    constructor(nome: string, preco: number){
        this.nome = nome;
        this.preco = preco;
    }

    public getNome(): string{
        return this.nome;
    }

    public getPreco(): number{
        return this.preco;
    }

    public setNome(nome: string): void{
        this.nome = nome;
    }

    public setPreco(preco: number): void{
        this.preco = preco;
    }
}