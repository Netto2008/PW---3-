import db from "../../../API/db.json" assert { type: "json" };

const getSelecoes = async () => {
    return db.selecoes;
};

const postSelecao = async (data) => {
    db.selecoes.push(data);
    return data;
};

const putSelecao = async (id, data) => {
    const index = db.selecoes.findIndex(s => s.id == id);
    if (index !== -1) {
        db.selecoes[index] = data;
    }
    return data;
};

const patchSelecao = async (id, data) => {
    const selecao = db.selecoes.find(s => s.id == id);
    if (selecao) {
        Object.assign(selecao, data);
    }
    return selecao;
};

const deleteSelecao = async (id) => {
    const index = db.selecoes.findIndex(s => s.id == id);
    if (index !== -1) {
        db.selecoes.splice(index, 1);
    }
};

export { getSelecoes, postSelecao, putSelecao, patchSelecao, deleteSelecao };