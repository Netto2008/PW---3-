import { getSelecoes } from '../../services/selecoes.js';
import { deleteJogador } from '../../services/jogadores.js';

// Pegar ID da URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Se não houver ID, redirecionar
if (!id) {
    window.location.href = '../selecoes/index.html';
}

const selecaoNomeElement = document.getElementById('selecao-nome');
const jogadoresContainer = document.getElementById('jogadores-container');

const renderJogadores = (selecao) => {
    const jogadores = selecao.jogadores;
    
    if (!jogadores || jogadores.length === 0) {
        jogadoresContainer.innerHTML = '<div class="mensagem-vazia">Nenhum jogador cadastrado. <a href="../cadastro-jogador/index.html?id=' + id + '">Adicionar</a></div>';
        return;
    }

    jogadoresContainer.innerHTML = '';
    jogadores.forEach(jogador => {
        const jogadorDiv = document.createElement('div');
        jogadorDiv.className = 'jogador-item';
        
        jogadorDiv.innerHTML = `
            <div class="jogador-camisa">${jogador.camisa}</div>
            <div class="jogador-info">
                <span class="jogador-nome">${jogador.nome}</span>
                <span class="jogador-detalhes">
                    <span>📍 ${jogador.posicao}</span>
                    <span>⚽ ${jogador.gols} gols</span>
                    ${jogador.titular ? '<span>⭐ Titular</span>' : '<span>Reserva</span>'}
                </span>
            </div>
            <div class="jogador-acoes">
                <button class="btn-editar" data-id-jogador="${jogador.id}">Editar</button>
                <button class="btn-deletar" data-id-jogador="${jogador.id}">Excluir</button>
            </div>
        `;
        
        jogadoresContainer.appendChild(jogadorDiv);
    });
    
    // Adicionar event listeners aos botões de editar
    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idJogador = e.target.dataset.idJogador;
            window.location.href = `../editar-jogador/index.html?id=${id}&jogador=${idJogador}`;
        });
    });
    
    // Adicionar event listeners aos botões de deletar
    document.querySelectorAll('.btn-deletar').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const idJogador = e.target.dataset.idJogador;
            const jogador = jogadores.find(j => j.id == idJogador);
            
            if (confirm(`Tem certeza que deseja excluir o jogador "${jogador.nome}"?`)) {
                try {
                    await deleteJogador(id, idJogador);
                    carregarDados();
                } catch (error) {
                    console.error('Erro ao deletar jogador:', error);
                    alert('Erro ao deletar jogador. Tente novamente!');
                }
            }
        });
    });
};

const carregarDados = async () => {
    try {
        const selecoes = await getSelecoes();
        const selecao = selecoes.find(s => s.id == id);
        
        if (!selecao) {
            selecaoNomeElement.textContent = 'Seleção não encontrada';
            jogadoresContainer.innerHTML = '<div class="mensagem-vazia">Seleção não encontrada!</div>';
            return;
        }
        
        // Exibir nome da seleção
        selecaoNomeElement.textContent = selecao.nome;
        
        // Renderizar jogadores
        renderJogadores(selecao);
        
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        jogadoresContainer.innerHTML = '<div class="mensagem-vazia">Erro ao carregar jogadores!</div>';
    }
};

carregarDados();
