function Card(selecao) {
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
        <div class="card-logo">
            <img src="${selecao.logo}" alt="Logo ${selecao.nome}">
        </div>
        <div class="card-content">
            <h3 class="card-title">${selecao.nome}</h3>
            <p class="card-group">Grupo ${selecao.grupo}</p>
            <div class="card-buttons">
                <button class="card-btn card-btn-primary" data-id="${selecao.id}">Ver Jogadores</button>
                <button class="card-btn card-btn-warning card-btn-edit" data-id="${selecao.id}">Editar</button>
                <button class="card-btn card-btn-danger card-btn-delete" data-id="${selecao.id}">Excluir</button>
            </div>
        </div>
    `;
    
    return card;
}

export { Card };