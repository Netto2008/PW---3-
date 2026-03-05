import { getSelecoes, deleteSelecao } from '../../services/selecoes.js';
import { Card } from '../../components/card/index.js';

const container = document.getElementById('selecoes-container');
const loadingContainer = document.getElementById('loading-container');

const renderSelecoes = (selecoes) => {
    container.innerHTML = '';
    selecoes.forEach(selecao => {
        const card = Card(selecao);
        container.appendChild(card);
    });

    // Event listener para botão "Ver Jogadores"
    document.querySelectorAll('.card-btn-primary').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            window.location.href = `../jogadores/index.html?id=${id}`;
        });
    });

    // Event listener para botão "Editar"
    document.querySelectorAll('.card-btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            window.location.href = `../editar-selecao/index.html?id=${id}`;
        });
    });

    // Event listener para botão "Excluir"
    document.querySelectorAll('.card-btn-delete').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            const card = e.target.closest('.card');
            const nomeSeleção = card.querySelector('.card-title').textContent;
            
            // Confirmação
            if (confirm(`Tem certeza que deseja excluir a seleção "${nomeSeleção}"?`)) {
                try {
                    await deleteSelecao(id);
                    // Recarregar lista
                    loadSelecoes();
                } catch (error) {
                    console.error('Erro ao deletar seleção:', error);
                    alert('Erro ao deletar seleção. Tente novamente!');
                }
            }
        });
    });
};

const loadSelecoes = async () => {
    try {
        container.innerHTML = '<div class="loading-container"><div class="loader"></div><span>Carregando seleções...</span></div>';
        const selecoes = await getSelecoes();
        renderSelecoes(selecoes);
    } catch (error) {
        console.error('Erro ao carregar seleções:', error);
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">⚠️</div><div class="empty-state-title">Erro ao carregar</div><p class="empty-state-text">Não conseguimos carregar as seleções. Por favor, tente novamente.</p><a href="javascript:location.reload()">Tentar Novamente</a></div>';
    }
};

loadSelecoes();