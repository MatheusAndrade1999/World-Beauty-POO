export default class Servico {
    private nome: string;
    private preco: number;
    private consumo: number;

    constructor(nome: string, preco: number) {
        this.setNome = nome;
        this.setPreco = preco;
        this.consumo = 0; // Inicializa o consumo como zero
    }

    // Retorna o nome do serviço
    public get getNome(): string {
        return this.nome;
    }

    // Retorna o preço do serviço
    public get getPreco(): number {
        return this.preco;
    }

    // Define o nome do serviço com validação
    public set setNome(nome: string) {
        if (!nome.trim()) {
            throw new Error("O nome do serviço não pode ser vazio.");
        }
        this.nome = nome;
    }

    // Define o preço do serviço com validação
    public set setPreco(preco: number){
        if (preco < 0) {
            throw new Error("O preço não pode ser negativo.");
        }
        this.preco = preco;
    }

    // Retorna o consumo do serviço
    public get getConsumo(): number {
        return this.consumo;
    }

    // Define o consumo do serviço com validação
    public set setConsumo(consumo: number) {
        if (consumo < 0) {
            throw new Error("O consumo não pode ser negativo.");
        }
        this.consumo = consumo;
    }

    // Aumenta o consumo do serviço
    public aumentarConsumo(valor: number): void {
        if (valor < 0) {
            throw new Error("O valor a ser adicionado ao consumo não pode ser negativo.");
        }
        this.consumo += valor;
    }

    // Diminui o consumo do serviço
    public diminuirConsumo(valor: number): void {
        if (valor < 0) {
            throw new Error("O valor a ser subtraído do consumo não pode ser negativo.");
        }
        this.consumo = Math.max(0, this.consumo - valor); // Garante que o consumo não fique negativo
    }
}
