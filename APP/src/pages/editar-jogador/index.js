import { getSelecoes } from '../../services/selecoes.js';
import { editJogador } from '../../services/jogadores.js';

// Pegar IDs da URL
const params = new URLSearchParams(window.location.search);
const idSelecao = params.get('id');
const idJogador = params.get('jogador');

// Se não houver IDs, redirecionar
if (!idSelecao || !idJogador) {
    window.location.href = '../selecoes/index.html';
}

const form = document.getElementById('form-jogador');
const mensagemDiv = document.getElementById('mensagem');
const btnVoltar = document.getElementById('btn-voltar');

// Atualizar link de voltar
btnVoltar.href = `../jogadores/index.html?id=${idSelecao}`;

// Carregar dados do jogador
const carregarDados = async () => {
    try {
        const selecoes = await getSelecoes();
        const selecao = selecoes.find(s => s.id == idSelecao);
        
        if (!selecao) {
            mostraMensagem('Seleção não encontrada!', 'erro');
            setTimeout(() => {
                window.location.href = '../selecoes/index.html';
            }, 2000);
            return;
        }
        
        const jogador = selecao.jogadores.find(j => j.id == idJogador);
        
        if (!jogador) {
            mostraMensagem('Jogador não encontrado!', 'erro');
            setTimeout(() => {
                window.location.href = `../jogadores/index.html?id=${idSelecao}`;
            }, 2000);
            return;
        }
        
        // Preencher formulário
        document.getElementById('nome').value = jogador.nome;
        document.getElementById('camisa').value = jogador.camisa;
        document.getElementById('posicao').value = jogador.posicao;
        document.getElementById('gols').value = jogador.gols;
        document.getElementById('titular').checked = jogador.titular;
        
    } catch (error) {
        console.error('Erro ao carregar jogador:', error);
        mostraMensagem('Erro ao carregar jogador!', 'erro');
    }
};

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
        // Editar jogador
        await editJogador(idSelecao, idJogador, {
            nome,
            camisa,
            posicao,
            gols,
            titular
        });
        
        // Mostrar sucesso
        mostraMensagem(`Jogador "${nome}" atualizado com sucesso!`, 'sucesso');
        
        // Redirecionar após 2 segundos
        setTimeout(() => {
            window.location.href = `../jogadores/index.html?id=${idSelecao}`;
        }, 2000);
        
    } catch (error) {
        console.error('Erro ao atualizar jogador:', error);
        mostraMensagem('Erro ao atualizar jogador. Tente novamente!', 'erro');
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

// Carregar dados ao abrir a página
carregarDados();