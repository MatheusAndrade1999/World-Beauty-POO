import Cadastro from "./../interfaces/cadastro";
import Cliente from "../../modelos/cliente";
import CPF from "../../modelos/cpf";
import RG from "../../modelos/rg";
import Entrada from "../../entrada";
import AuthCliente from "./../middleware/authCliente";
import Telefone from "../../modelos/telefone";


export default class CadastroCliente extends Cadastro {
    private clientes: Cliente[];
    private entrada: Entrada;

    constructor(clientes: Cliente[]) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        const auth = new AuthCliente();
        const nome = this.entrada.texto("Digite o nome do cliente:");
        const nomeSocial = this.entrada.texto("Digite o nome social do cliente:");
        
        const rg = new RG(this.entrada.texto("Digite o RG do cliente:"));
        

        const cliente = new Cliente(nome, cpf, rg, telefone);

        this.clientes.push(cliente);

        console.log("Cliente cadastrado com sucesso!");
    }

