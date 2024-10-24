import Cliente from "./clientes";
import Servico from "./servico";
import Produto from "./produto";

export default class Empresa{
    private clientes: Cliente[];
    private servicos: Servico[];
    private produtos: Produto[];

    constructor(clientes: Cliente[], servicos: Servico[], produtos: Produto[]){
        this.clientes = clientes;
        this.servicos = servicos;
        this.produtos = produtos;
    }

    public getClientes(): Cliente[]{
        return this.clientes;
    }

    public getServicos(): Servico[]{
        return this.servicos;
    }

    public getProdutos(): Produto[]{
        return this.produtos;
    }

    
}