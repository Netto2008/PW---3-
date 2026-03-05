function Navbar() {
    const navbar = document.createElement('nav');
    navbar.className = 'navbar';
    
    navbar.innerHTML = `
        <div class="navbar-container">
            <a href="/APP/src/pages/home/index.html" class="logo">⚽ Copa do Mundo</a>
            <div class="nav-links">
                <a href="/APP/src/pages/selecoes/index.html" class="nav-link">Seleções</a>
                <a href="/APP/src/pages/cadastro-selecoes/index.html" class="nav-link">+ Nova</a>
            </div>
        </div>
    `;
    
    return navbar;
}

function Footer() {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    
    footer.innerHTML = `
        <div class="footer-content">
            <p>&copy; 2026 Copa do Mundo. Todos os direitos reservados.</p>
        </div>
    `;
    
    return footer;
}

export { Navbar, Footer };
