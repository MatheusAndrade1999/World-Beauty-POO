export default class Telefone {
    private ddd: string;
    private numero: string;


    constructor(ddd: string, numero: string){
        this.ddd = ddd;
        this.numero = numero;
    }

    public getDdd(): string{
        return this.ddd;
    }

    public getNumero(): string{
        return this.numero;
    }
}