import Servico from "../../modelos/servico";

export default class AuthServico {

    private servicos: Servico[];

    constructor(servicos: Servico[]) {
        this.servicos = servicos;
    }

    // Método para verificar a existência de um serviço pelo nome
    public autenticarServico(nomeServico: string): boolean {
        return this.servicos.some(servico => servico.getNome === nomeServico);
    }
}
