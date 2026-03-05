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

const POST = async (url, data) => {
    try {
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const result = await fetch(url, requestOptions);
        if(result.status !== 201){
            throw new Error("Erro ao criar dados");
        }
        return await result.json();
    } catch (error) {
        console.error(error);
        throw error;
    };
};

const PUT = async (url, data) => {
    try {
        let requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const result = await fetch(url, requestOptions);
        if(result.status !== 200){
            throw new Error("Erro ao atualizar dados");
        }
        return await result.json();
    } catch (error) {
        console.error(error);
        throw error;
    };
};

const PATCH = async (url, data) => {
    try {
        let requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const result = await fetch(url, requestOptions);
        if(result.status !== 200){
            throw new Error("Erro ao atualizar dados");
        }
        return await result.json();
    } catch (error) {
        console.error(error);
        throw error;
    };
};

const DELETE = async (url) => {
    try {
        let requestOptions = {
            method: 'DELETE'
        };
        const result = await fetch(url, requestOptions);
        if(result.status !== 200){
            throw new Error("Erro ao deletar dados");
        }
    } catch (error) {
        console.error(error);
        throw error;
    };
};

export { GET, POST, PUT, PATCH, DELETE };