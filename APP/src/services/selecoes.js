const BASE_URL = 'https://sturdy-fortnight-6956gj4gxjg7fw7w-3000.app.github.dev';

const getSelecoes = async () => {
    const response = await fetch(`${BASE_URL}/selecoes`);
    return response.json();
};

const postSelecao = async (data) => {
    const response = await fetch(`${BASE_URL}/selecoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
};

const putSelecao = async (id, data) => {
    const response = await fetch(`${BASE_URL}/selecoes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
};

const patchSelecao = async (id, data) => {
    const response = await fetch(`${BASE_URL}/selecoes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
};

const deleteSelecao = async (id) => {
    await fetch(`${BASE_URL}/selecoes/${id}`, {
        method: 'DELETE'
    });
};

export { getSelecoes, postSelecao, putSelecao, patchSelecao, deleteSelecao };