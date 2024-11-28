export const cadastrarProduto = async (produto: any) => {
    const url = 'http://localhost:3000/produtos'; // URL do endpoint do backend

    const resposta = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(produto),
    });

    if (!resposta.ok) {
        throw new Error(`Erro ao cadastrar produto: ${resposta.statusText}`);
    }

    return resposta.json();
};
