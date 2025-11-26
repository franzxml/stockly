document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulasi login sukses
            alert("Login Berhasil! Mengarahkan ke Dashboard...");
            // Nanti kita akan arahkan ke dashboard.html
            // window.location.href = 'dashboard.html'; 
        });
    }
});