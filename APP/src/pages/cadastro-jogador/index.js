import { addJogador } from '../../services/jogadores.js';

// Pegar IDs da URL
const params = new URLSearchParams(window.location.search);
const idSelecao = params.get('id');

// Se não houver ID, redirecionar
if (!idSelecao) {
    window.location.href = '../selecoes/index.html';
}

const form = document.getElementById('form-jogador');
const mensagemDiv = document.getElementById('mensagem');
const btnVoltar = document.getElementById('btn-voltar');

// Atualizar link de voltar
btnVoltar.href = `../jogadores/index.html?id=${idSelecao}`;

// Submeter formulário
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Obter dados do formulário
    const nome = document.getElementById('nome').value.trim();
    const camisa = parseInt(document.getElementById('camisa').value);
    const posicao = document.getElementById('posicao').value.trim();
    const gols = parseInt(document.getElementById('gols').value);
    const titular = document.getElementById('titular').checked;
    
    // Validações básicas
    if (!nome || !posicao) {
        mostraMensagem('Por favor, preencha todos os campos!', 'erro');
        return;
    }
    
    if (isNaN(camisa) || camisa < 1 || camisa > 99) {
        mostraMensagem('Número de camisa deve estar entre 1 e 99!', 'erro');
        return;
    }
    
    try {
        // Adicionar jogador
        await addJogador(idSelecao, {
            nome,
            camisa,
            posicao,
            gols,
            titular
        });
        
        // Mostrar sucesso
        mostraMensagem(`Jogador "${nome}" adicionado com sucesso!`, 'sucesso');
        
        // Limpar formulário
        form.reset();
        
        // Redirecionar após 2 segundos
        setTimeout(() => {
            window.location.href = `../jogadores/index.html?id=${idSelecao}`;
        }, 2000);
        
    } catch (error) {
        console.error('Erro ao adicionar jogador:', error);
        mostraMensagem('Erro ao adicionar jogador. Tente novamente!', 'erro');
    }
});

function mostraMensagem(texto, tipo) {
    mensagemDiv.textContent = texto;
    mensagemDiv.className = `mensagem show ${tipo}`;
    
    // Remover mensagem após 5 segundos se for sucesso
    if (tipo === 'sucesso') {
        setTimeout(() => {
            mensagemDiv.className = 'mensagem';
        }, 5000);
    }
}
