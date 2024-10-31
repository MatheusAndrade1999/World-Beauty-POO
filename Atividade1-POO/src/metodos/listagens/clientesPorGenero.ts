import Cliente from "../../modelos/cliente";
import Entrada from "../../entrada";

export default class ClientesPorGenero {
    private clientes: Cliente[];
    private entrada: Entrada;

    constructor(clientes: Cliente[]) {
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public listarClientesPorGenero(): void {
        let execucao = true;

        while (execucao) {
            console.clear();
            console.log("=== Listar Clientes por Gênero ===\n");
            console.log("1 - Masculino");
            console.log("2 - Feminino");
            console.log("3 - Sair");

            const opcao = this.entrada.receberNumero("Digite a opção desejada: ");

            switch (opcao) {
                case 1:
                    console.log("\n=== Listagem dos clientes masculinos ===\n");
                    this.clientes
                        .filter(cliente => cliente.getGenero === "M")
                        .forEach(cliente => console.log(`Nome: ${cliente.nome}`));
                    this.aguardarContinuacao();
                    break;

                case 2:
                    console.log("\n=== Listagem dos clientes femininos ===\n");
                    this.clientes
                        .filter(cliente => cliente.getGenero === "F")
                        .forEach(cliente => console.log(`Nome: ${cliente.nome}`));
                    this.aguardarContinuacao();
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

    private aguardarContinuacao(): void {
        this.entrada.receberTexto("\nPressione enter para continuar");
    }
}
