document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const role = document.getElementById('userRole').value;
            const email = loginForm.querySelector('input[type="email"]').value;
            
            // Mock authentication
            const userData = {
                role: role,
                email: email,
                name: role.charAt(0).toUpperCase() + role.slice(1) + ' User',
                isLoggedIn: true
            };
            
            localStorage.setItem('academix_user', JSON.stringify(userData));
            
            // Redirect to dashboard
            window.location.href = './index.html';
        });
    }
});

export function getCurrentUser() {
    const user = localStorage.getItem('academix_user');
    return user ? JSON.parse(user) : null;
}

export function logout() {
    localStorage.removeItem('academix_user');
    window.location.href = './login.html';
}
