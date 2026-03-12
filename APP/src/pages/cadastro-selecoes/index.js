import { getSelecoes, postSelecao } from '../../services/selecoes.js';

const form = document.getElementById('form-cadastro');
const mensagemDiv = document.getElementById('mensagem');

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
        // Obter ID máximo atual
        const selecoes = await getSelecoes();
        const maxId = selecoes.length > 0 ? Math.max(...selecoes.map(s => parseInt(s.id) || 0)) : 0;
        
        // Criar novo objeto de seleção
        const novaSelecao = {
            nome,
            grupo,
            logo,
            conquistas: [],
            jogadores: []
        };
        // id removido — JSON Server cria automaticamente
        
        // Salvar nova seleção
        const result = await postSelecao(novaSelecao);
        if(result){
            // Mostrar sucesso
            alert(`Seleção "${nome}" cadastrada com sucesso!`, 'sucesso');
            
            // Limpar formulário
            form.reset();

        }
        
        
        // // Redirecionar após 2 segundos
        // setTimeout(() => {
        //     window.location.href = '../selecoes/index.html';
        // }, 2000);
        
    } catch (error) {
        console.error('Erro ao cadastrar seleção:', error);
        alert('Erro ao cadastrar seleção. Tente novamente!', 'erro');
    }
});

// function mostraMensagem(texto, tipo) {
//     mensagemDiv.textContent = texto;
//     mensagemDiv.className = `mensagem show ${tipo}`;
    
//     // Remover mensagem após 5 segundos se for sucesso
//     if (tipo === 'sucesso') {
//         setTimeout(() => {
//             mensagemDiv.className = 'mensagem';
//         }, 5000);
//     }
//}
