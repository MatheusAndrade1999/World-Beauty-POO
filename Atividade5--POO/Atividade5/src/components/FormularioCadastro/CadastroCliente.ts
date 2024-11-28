export const cadastrarCliente = async (cliente: any) => {
    const url = 'http://localhost:3000/clientes'; // URL do endpoint do backend

    const resposta = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
    });

    if (!resposta.ok) {
        throw new Error(`Erro ao cadastrar cliente: ${resposta.statusText}`);
    }

    return resposta.json();
};
