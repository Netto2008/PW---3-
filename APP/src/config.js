const dominio = "http://localhost";
const port  = "3000";
const base_url = `${dominio}:${port}`;

const routes = {
    "selecoes": `${base_url}/selecoes`,
};

const GET = async (url,) => {
    try {
    let requestOptions = {
        method: 'GET'
    };
    const result = await fetch(url, requestOptions);
    if(result.status !== 200){
        throw new Error("Erro ao buscar dados");
    }
    return await result.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};