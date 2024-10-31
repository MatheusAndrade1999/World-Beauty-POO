import Excluir from "../interfaces/excluir";
import Cliente from "../../modelos/cliente";
import Entrada from "../../entrada";

export default class ExcluirCliente extends Excluir {
    private clientes: Cliente[];
    private entrada: Entrada;

    constructor(clientes: Cliente[]) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    // Método para exclusão de cliente com base no CPF
    public excluir(): void {
        // Recebe o CPF do cliente a ser excluído
        const cpf = this.entrada.receberTexto("CPF do cliente: ");

        // Busca o cliente pelo CPF e o remove, se encontrado
        const indexCliente = this.clientes.findIndex(cliente => cliente.getCPF.getValor === cpf);
        
        if (indexCliente !== -1) {
            this.clientes.splice(indexCliente, 1); // Remove cliente da lista
            console.log("Cliente excluído com sucesso!");
        } else {
            console.log("Cliente não encontrado. Verifique o CPF e tente novamente.");
        }
    }
}
