// Theme toggle functionality
document.getElementById('theme-icon').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        this.textContent = 'light_mode';
    } else {
        this.textContent = 'dark_mode';
    }
});