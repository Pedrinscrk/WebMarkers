window.addEventListener('scroll', function() {
    const section = document.getElementById('landing-page-section');
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight / 1.5) {
        section.classList.add('animate-on-scroll');
    }
});