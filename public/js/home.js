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
        threshold: 0.5 // Define quando o elemento é considerado visível (50% neste caso)
    });

    const elementosAnimados = document.querySelectorAll('.processo-etapa-insano');
    elementosAnimados.forEach(elemento => {
        observer.observe(elemento);
    });
});