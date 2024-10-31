export default class Telefone {
    private ddd: string;
    private numero: string;

    constructor(ddd: string, numero: string) {
        this.setDdd(ddd);
        this.setNumero(numero);
    }

    // Retorna o DDD
    public get getDdd(): string {
        return this.ddd;
    }

    // Retorna o número
    public get getNumero(): string {
        return this.numero;
    }

    // Define o DDD com validação
    public setDdd(ddd: string): void {
        if (!/^\d{2}$/.test(ddd)) {
            throw new Error("DDD inválido. Deve conter 2 dígitos.");
        }
        this.ddd = ddd;
    }

    // Define o número com validação
    public setNumero(numero: string): void {
        if (!/^\d{8,9}$/.test(numero)) {
            throw new Error("Número inválido. Deve conter entre 8 e 9 dígitos.");
        }
        this.numero = numero;
    }

    // Exibe o telefone formatado
    public formatarTelefone(): string {
        return `(${this.ddd}) ${this.numero.slice(0, this.numero.length - 4)}-${this.numero.slice(-4)}`;
    }
}
