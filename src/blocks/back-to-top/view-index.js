document.addEventListener('DOMContentLoaded', () => {
    const backToTopButton = document.querySelector('.wp-block-chee-namespace-back-to-top');
    if (!backToTopButton) return;

    const handleScroll = () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    };

    window.addEventListener('scroll', handleScroll);
});
