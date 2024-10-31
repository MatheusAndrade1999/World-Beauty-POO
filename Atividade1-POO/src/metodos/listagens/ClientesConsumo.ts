import Cliente from "../../modelos/cliente";
import Entrada from "../../entrada";

export default class ClientesConsumo {
    private clientes: Cliente[];
    private entrada: Entrada;

    constructor(clientes: Cliente[]) {
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public listarClientesQueMaisConsumiram(): void {
        console.clear();
        let execucao = true;

        while (execucao) {
            console.log("=== Listar Clientes que mais consumiram ===\n");
            console.log("1 - Produtos");
            console.log("2 - Serviços");
            console.log("3 - Sair");
            const opcao = this.entrada.receberNumero("Digite a opção desejada: ");

            switch (opcao) {
                case 1:
                    this.listarTopClientes("produtos", true);
                    break;
                case 2:
                    this.listarTopClientes("serviços", true);
                    break;
                case 3:
                    execucao = false;
                    break;
                default:
                    console.log("Opção inválida");
                    break;
            }
        }
    }

    public listarClientesQueMenosConsumiram(): void {
        console.clear();
        let execucao = true;

        while (execucao) {
            console.log("=== Listar Clientes que menos consumiram ===\n");
            console.log("1 - Produtos");
            console.log("2 - Serviços");
            console.log("3 - Sair");
            const opcao = this.entrada.receberNumero("Digite a opção desejada: ");

            switch (opcao) {
                case 1:
                    this.listarTopClientes("produtos", false);
                    break;
                case 2:
                    this.listarTopClientes("serviços", false);
                    break;
                case 3:
                    execucao = false;
                    break;
                default:
                    console.log("Opção inválida");
                    break;
            }
        }
    }

    public listarClientesQueMaisGastaram(): void {
        console.clear();
        const clientes = this.clientes.sort((a, b) => b.getGastos - a.getGastos).slice(0, 5);
        
        console.log("=== Clientes que mais gastaram ===\n");
        clientes.forEach(cliente => {
            console.log(`Nome: ${cliente.nome} - Gastos: ${cliente.getGastos}`);
        });
        
        this.aguardarContinuacao();
    }

    private listarTopClientes(tipo: "produtos" | "serviços", mais: boolean): void {
        const comparador = mais 
            ? (a: Cliente, b: Cliente) => b[`get${tipo.charAt(0).toUpperCase() + tipo.slice(1)}Consumidos`].length - a[`get${tipo.charAt(0).toUpperCase() + tipo.slice(1)}Consumidos`].length
            : (a: Cliente, b: Cliente) => a[`get${tipo.charAt(0).toUpperCase() + tipo.slice(1)}Consumidos`].length - b[`get${tipo.charAt(0).toUpperCase() + tipo.slice(1)}Consumidos`].length;

        const topClientes = this.clientes.sort(comparador).slice(0, 10);
        console.log(`=== Listar os 10 Clientes que ${mais ? 'mais' : 'menos'} consumiram ${tipo} ===\n`);
        
        topClientes.forEach(cliente => {
            console.log(`Nome: ${cliente.nome} - ${tipo.charAt(0).toUpperCase() + tipo.slice(1)} consumidos: ${cliente[`get${tipo.charAt(0).toUpperCase() + tipo.slice(1)}Consumidos`].length}`);
        });

        this.aguardarContinuacao();
    }

    private aguardarContinuacao(): void {
        this.entrada.receberTexto("\nPressione enter para continuar");
    }
}
