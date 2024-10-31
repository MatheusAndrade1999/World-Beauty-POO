import CPF from './cpf';
import RG from './rg';
import Telefone from './telefone';
import Produto from './produto';
import Servico from './servico';

export default class Cliente{
    public nome: string;
    public nomeSocial: string;
    private cpf: CPF;
    private genero: string;
    private rgs: RG[];
    private dataCadastro: Date;
    private telefones: Telefone[];
    private produtosConsumidos: Produto[] = [];
    private servicosConsumidos: Servico[] = [];
    private gastos: number;

connstructor(nome: string, nomeSocial: string, cpf: CPF,
            genero: string, rgs: RG[], dataCadastro: Date,
            telefones: Telefone[]){
    this.nome = nome;
    this.nomeSocial = nomeSocial;
    this.cpf = cpf;
    this.genero = genero;
    this.rgs = rgs;
    this.dataCadastro = dataCadastro;
    this.telefones = telefones;
}

// Getters

public getNome(): string{
    return this.nome;
}

public getNomeSocial(): string{
    return this.nomeSocial;
}

public getCPF(): CPF{
    return this.cpf;
}

public getGenero(): string{
    return this.genero;
}   

public getRgs(): RG[]{  
    return this.rgs;
}

public getDataCadastro(): Date{
    return this.dataCadastro;
}

public getTelefones(): Telefone[]{
    return this.telefones;
}

public getProdutosConsumidos(): Produto[]{
    return this.produtosConsumidos;
}

public getServicosConsumidos(): Servico[]{
    return this.servicosConsumidos;
}

public getGastos(): number{
    return this.gastos;
}


// Setters

public setNome(nome: string): void{
    this.nome = nome;
}

public setNomeSocial(nomeSocial: string): void{
    this.nomeSocial = nomeSocial;
}

public setCPF(cpf: CPF): void{
    this.cpf = cpf;
}

public setGenero(genero: string): void{
    this.genero = genero;
}

public setRgs(rgs: RG[]): void{
    this.rgs = rgs;
}

public setDataCadastro(dataCadastro: Date): void{
    this.dataCadastro = dataCadastro;
}

public setTelefones(telefones: Telefone[]): void{
    this.telefones = telefones;
}

public setProdutosConsumidos(produtosConsumidos: Produto[]): void{
    this.produtosConsumidos = produtosConsumidos;
}

public setServicosConsumidos(servicosConsumidos: Servico[]): void{
    this.servicosConsumidos = servicosConsumidos;
}

public setGastos(gastos: number): void{
    this.gastos = gastos;
}

}
