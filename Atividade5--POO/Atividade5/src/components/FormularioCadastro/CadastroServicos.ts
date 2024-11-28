export const cadastrarServico = async (servico: any) => {
    const url = 'http://localhost:3000/servicos'; // URL do endpoint do backend

    const resposta = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(servico),
    });

    if (!resposta.ok) {
        throw new Error(`Erro ao cadastrar serviço: ${resposta.statusText}`);
    }

    return resposta.json();
};
