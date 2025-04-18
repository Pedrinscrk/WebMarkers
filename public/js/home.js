window.addEventListener('scroll', function() {
    const section = document.getElementById('landing-page-section');
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight / 1.5) {
        section.classList.add('animate-on-scroll');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animado');
                observer.unobserve(entry.target); // Para de observar após a animação ocorrer uma vez
            }
        });
    }, {
        threshold: 0.5 // Ajustei para 0.1 (10%) para talvez ativar um pouco antes
                       // pode manter 0.5 se preferir
    });

    // -------> CORREÇÃO AQUI: Usando a nova classe '.etapa-processo' <-------
    const elementosAnimados = document.querySelectorAll('.etapa-processo');

    elementosAnimados.forEach(elemento => {
        observer.observe(elemento);
    });
});




// Adiciona uma verificação global para garantir que o código de inicialização rode apenas uma vez
// 'window' é usado para que a variável seja acessível em diferentes execuções do script na mesma página
if (!window.whatsappScriptInitialized) {
    window.whatsappScriptInitialized = true; // Marca como inicializado na primeira execução

    document.addEventListener('DOMContentLoaded', function() {

        const whatsappButtons = document.querySelectorAll('.whatsapp-trigger');
        const modalOverlay = document.getElementById('modal-whatsapp-loading');

        const phoneNumber = '5566992524707';
        const whatsappUrl = `https://wa.me/${phoneNumber}`;

        // Variável para armazenar o ID do timer do WhatsApp (agora dentro do escopo que roda uma vez)
        let whatsappTimerId = null;

        // Flag para controlar se o processo de abertura do WhatsApp já está ativo
        // Isso impede que múltiplos cliques iniciem múltiplos timers/aberturas
        let isOpeningProcessActive = false;

        // Função auxiliar para resetar o estado após o processo terminar ou ser cancelado
        function resetWhatsappProcessState() {
            if (whatsappTimerId !== null) {
                clearTimeout(whatsappTimerId); // Cancela o timer pendente, se houver
                whatsappTimerId = null; // Limpa a referência do ID
            }
            isOpeningProcessActive = false; // Permite que um novo processo seja iniciado
            modalOverlay.classList.remove('ativo'); // Esconde o modal
    
        }


        if (modalOverlay) {
            whatsappButtons.forEach(function(button) {
                button.addEventListener('click', function(event) {
                    event.preventDefault();

                    // **Salvaguarda principal:** Se o processo já estiver ativo, ignora cliques adicionais
                    if (isOpeningProcessActive) {
                
                        return; // Sai da função do listener, não faz mais nada
                    }

                    // Se não estiver ativo, inicia o processo
                    isOpeningProcessActive = true;
           


                    // Garante que qualquer timer anterior seja limpo antes de iniciar um novo
                    // (Redundante se isOpeningProcessActive funcionar 100%, mas boa prática)
                     if (whatsappTimerId !== null) {
                          clearTimeout(whatsappTimerId);
                     }


                    // Mostra o modal
                    modalOverlay.classList.add('ativo');

                    // Define o timer para abrir o link
                    whatsappTimerId = setTimeout(function() {
                        // Esta função será executada após 3 segundos, A MENOS QUE seja cancelada

                        // **Salvaguarda:** Verifica a flag novamente antes de abrir a janela
                        // Caso o timer tenha sido cancelado mas a função setTimeout ainda rodou
                    

                        // Reseta o estado APÓS a tentativa de abrir a janela (ou se o timer rodou após cancelamento)
                        resetWhatsappProcessState();

                    }, 3000); // 3000 milissegundos = 3 segundos
                });
            });

            // Listener para fechar o modal clicando fora do conteúdo
            modalOverlay.addEventListener('click', function(event) {
                // Verifica se o clique foi DIRETAMENTE no overlay (não em um elemento dentro do modal-conteudo)
                if (event.target === modalOverlay) {
                    console.log("Overlay clicado. Cancelando processo.");
                    // Reseta o estado (cancela timer, esconde modal, reseta flag)
                    resetWhatsappProcessState();
                }
            });
        } else {
            console.error("Elemento com ID 'modal-whatsapp-loading' não encontrado.");
             // Mesmo que o modal não exista, a flag `isOpeningProcessActive` ainda ajudaria a limitar múltiplos window.open
        }
    });

} 
