import { getSelecoes, putSelecao } from '../../services/selecoes.js';

const form = document.getElementById('form-edicao');
const mensagemDiv = document.getElementById('mensagem');

// Pegar ID da URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Se não houver ID, redirecionar
if (!id) {
    window.location.href = '../selecoes/index.html';
}

// Carregar dados da seleção
const carregarDados = async () => {
    try {
        const selecoes = await getSelecoes();
        const selecao = selecoes.find(s => s.id == id);
        
        if (!selecao) {
            mostraMensagem('Seleção não encontrada!', 'erro');
            setTimeout(() => {
                window.location.href = '../selecoes/index.html';
            }, 2000);
            return;
        }
        
        // Preencher formulário
        document.getElementById('nome').value = selecao.nome;
        document.getElementById('grupo').value = selecao.grupo;
        document.getElementById('logo').value = selecao.logo;
        
    } catch (error) {
        console.error('Erro ao carregar seleção:', error);
        mostraMensagem('Erro ao carregar seleção!', 'erro');
    }
};

// Submeter formulário
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Obter dados do formulário
    const nome = document.getElementById('nome').value.trim();
    const grupo = document.getElementById('grupo').value.trim();
    const logo = document.getElementById('logo').value.trim();
    
    // Validações básicas
    if (!nome || !grupo || !logo) {
        mostraMensagem('Por favor, preencha todos os campos!', 'erro');
        return;
    }
    
    try {
        // Obter seleção atual para manter dados antigos
        const selecoes = await getSelecoes();
        const selecaoAtual = selecoes.find(s => s.id == id);
        
        // Preparar dados atualizados
        const selecaoAtualizada = {
            ...selecaoAtual,
            nome,
            grupo,
            logo
        };
        
        // Fazer PUT
        await putSelecao(id, selecaoAtualizada);
        
        // Mostrar sucesso
        mostraMensagem(`Seleção "${nome}" atualizada com sucesso!`, 'sucesso');
        
        // Redirecionar após 2 segundos
        setTimeout(() => {
            window.location.href = '../selecoes/index.html';
        }, 2000);
        
    } catch (error) {
        console.error('Erro ao atualizar seleção:', error);
        mostraMensagem('Erro ao atualizar seleção. Tente novamente!', 'erro');
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
