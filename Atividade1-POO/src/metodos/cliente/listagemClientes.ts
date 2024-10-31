import Cliente from "../../modelos/cliente";
import Listagem from "../interfaces/listagem";
import Entrada from "../../entrada";

export default class ListagemClientes extends Listagem {
    private clientes: Cliente[];
    private entrada: Entrada;

    constructor(clientes: Cliente[]) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    // Método principal para exibir a lista de clientes com suas informações detalhadas
    public listar(): void {
        console.clear();
        console.log('\n Listagem de Clientes');
        console.log('=====================');

        // Exibindo informações de cada cliente na lista
        this.clientes.forEach(cliente => {
            console.log(`Nome: ${cliente.nome}`);
            console.log(`Nome social: ${cliente.nomeSocial}`);
            console.log(`CPF: ${cliente.getCPF.getValor}`);
            console.log(`Gênero: ${cliente.getGenero}`);
            
            // Mostrando RGS do cliente em uma lista formatada
            console.log(`RGs: ${cliente.getRgs.map(rg => rg.getValor).join(', ')}`);
            
            // Exibindo telefones no formato (DDD) Número
            console.log(`Telefones: ${cliente.getTelefones.map(telefone => `(${telefone.getDdd}) ${telefone.getNumero}`).join(', ')}`);
            console.log("=====================");
        });

        // Controlando saída do programa após listagem
        let execucao = true;
        while (execucao) {
            const opcao = this.entrada.receberNumero('Pressione qualquer tecla para sair: ');
            
            // A qualquer entrada, termina a execução do laço e exibe a saída
            console.log('Saindo...');
            execucao = false;
        }
    }
}
