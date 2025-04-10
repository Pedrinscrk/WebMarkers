// /js/partils/header.js

function toggleMenu() {
    const menu = document.querySelector('.menu-container');
    const toggler = document.querySelector('.navbar-toggler');

    // Verifica se o menu existe antes de tentar manipular
    if (menu && toggler) {
        menu.classList.toggle('active');
        const isExpanded = menu.classList.contains('active'); // Verifica diretamente pela classe
        toggler.setAttribute('aria-expanded', isExpanded);

        // Adiciona ou remove listener para fechar ao clicar no link (se o menu estiver ativo)
        if (isExpanded) {
            addLinkListeners(menu, toggler);
        } else {
            // Opcional: remover listeners se não precisar mais (boa prática se houver muitos links)
        }
    } else {
        console.error("Elemento .menu-container ou .navbar-toggler não encontrado.");
    }
}

// Função separada para adicionar listeners aos links
function addLinkListeners(menu, toggler) {
    menu.querySelectorAll('.menu-links a').forEach(link => {
        // Remove listener antigo para evitar duplicação se toggleMenu for chamado múltiplas vezes
        link.removeEventListener('click', closeMenuOnClick);
        // Adiciona o novo listener
        link.addEventListener('click', () => closeMenuOnClick(menu, toggler), { once: true }); // { once: true } remove o listener após o primeiro clique
    });

     // Adiciona listener ao botão de orçamento também
    const orcamentoBtn = menu.querySelector('.btn-orcamento');
    if (orcamentoBtn) {
         orcamentoBtn.removeEventListener('click', closeMenuOnClick);
         orcamentoBtn.addEventListener('click', () => closeMenuOnClick(menu, toggler), { once: true });
    }
}

// Função para fechar o menu
function closeMenuOnClick(menu, toggler) {
    if (menu && toggler) {
        menu.classList.remove('active');
        toggler.setAttribute('aria-expanded', 'false');
    }
}
// Adiciona listener ao documento para fechar o menu ao clicar fora dele
document.addEventListener('click', function(event) {
    const header = document.querySelector('.navbar');
    const menu = document.querySelector('.menu-container');
    const toggler = document.querySelector('.navbar-toggler');

    // Se o menu está ativo e o clique foi fora do header
    if (menu && menu.classList.contains('active') && !header.contains(event.target)) {
         menu.classList.remove('active');
         toggler.setAttribute('aria-expanded', 'false');
    }
});

// Adiciona listener ao botão toggler inicial
const togglerButton = document.querySelector('.navbar-toggler');
if (togglerButton) {
    togglerButton.addEventListener('click', toggleMenu);
}