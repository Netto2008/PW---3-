import { getSelecoes, putSelecao } from './selecoes.js';

const addJogador = async (idSelecao, dadosJogador) => {
    const selecoes = await getSelecoes();
    const selecao = selecoes.find(s => s.id == idSelecao);
    
    if (!selecao) {
        throw new Error('Seleção não encontrada');
    }
    
    // Obter próximo ID de jogador
    const maxId = selecao.jogadores.length > 0 
        ? Math.max(...selecoes.map(s => parseInt(s.id) || 0))
        : 0;
    
    const novoJogador = {
        id: maxId + 1,
        ...dadosJogador
    };
    
    selecao.jogadores.push(novoJogador);
    await putSelecao(idSelecao, selecao);
    
    return novoJogador;
};

const editJogador = async (idSelecao, idJogador, dadosJogador) => {
    const selecoes = await getSelecoes();
    const selecao = selecoes.find(s => s.id == idSelecao);
    
    if (!selecao) {
        throw new Error('Seleção não encontrada');
    }
    
    const jogador = selecao.jogadores.find(j => j.id == idJogador);
    
    if (!jogador) {
        throw new Error('Jogador não encontrado');
    }
    
    // Atualizar jogador
    Object.assign(jogador, dadosJogador);
    
    await putSelecao(idSelecao, selecao);
    
    return jogador;
};

const deleteJogador = async (idSelecao, idJogador) => {
    const selecoes = await getSelecoes();
    const selecao = selecoes.find(s => s.id == idSelecao);
    
    if (!selecao) {
        throw new Error('Seleção não encontrada');
    }
    
    const index = selecao.jogadores.findIndex(j => j.id == idJogador);
    
    if (index === -1) {
        throw new Error('Jogador não encontrado');
    }
    
    selecao.jogadores.splice(index, 1);
    
    await putSelecao(idSelecao, selecao);
};

export { addJogador, editJogador, deleteJogador };
