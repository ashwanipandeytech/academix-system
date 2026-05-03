document.addEventListener('DOMContentLoaded', () => {
    initCustomSelects();
    
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const otpForm = document.getElementById('otpForm');
    const otpToggleBtn = document.getElementById('otpToggleBtn');
    const backToLoginBtn = document.getElementById('backToLoginBtn');
    
    const authTabContent = document.getElementById('authTabContent');
    const authTab = document.getElementById('authTab');
    const otpContainer = document.getElementById('otpContainer');

    let pendingUser = null;

    // Login Form Submit
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const role = document.getElementById('userRole').value;
            const email = document.getElementById('loginEmail').value;
            
            login({
                role: role,
                email: email,
                name: role.charAt(0).toUpperCase() + role.slice(1) + ' User'
            });
        });
    }

    // Signup Form Submit
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const role = document.getElementById('signupRole').value;
            const email = document.getElementById('signupEmail').value;
            const name = document.getElementById('signupName').value;
            const password = document.getElementById('signupPassword').value;
            const confirm = document.getElementById('signupConfirm').value;

            if (password !== confirm) {
                alert("Passwords do not match!");
                return;
            }
            
            login({
                role: role,
                email: email,
                name: name
            });
        });
    }

    // OTP Toggle
    if (otpToggleBtn) {
        otpToggleBtn.addEventListener('click', () => {
            authTab.classList.add('d-none');
            authTabContent.classList.add('d-none');
            otpContainer.classList.remove('d-none');
        });
    }

    if (backToLoginBtn) {
        backToLoginBtn.addEventListener('click', () => {
            authTab.classList.remove('d-none');
            authTabContent.classList.remove('d-none');
            otpContainer.classList.add('d-none');
        });
    }

    // OTP Form Submit
    if (otpForm) {
        otpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app, we'd verify the digits here
            login({
                role: 'admin', // Default for mock OTP
                email: 'admin@academix.com',
                name: 'Admin User'
            });
        });
    }

    function login(userData) {
        const user = {
            ...userData,
            isLoggedIn: true
        };
        localStorage.setItem('academix_user', JSON.stringify(user));
        window.location.href = './index.html';
    }

    function initCustomSelects() {
        const dropdowns = document.querySelectorAll('.custom-select-dropdown');
        dropdowns.forEach(dropdown => {
            const button = dropdown.querySelector('button');
            const selectedText = button.querySelector('.selected-value');
            const hiddenInput = dropdown.querySelector('input[type="hidden"]');
            const items = dropdown.querySelectorAll('.dropdown-item');

            items.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const value = item.getAttribute('data-value');
                    const text = item.textContent;

                    // Update UI
                    selectedText.textContent = text;
                    hiddenInput.value = value;

                    // Update active state
                    items.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                });
            });
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
