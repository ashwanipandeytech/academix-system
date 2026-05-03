import { getCurrentUser, logout } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    // Check Authentication
    const user = getCurrentUser();
    if (!user && !window.location.pathname.includes('login.html')) {
        window.location.href = './login.html';
        return;
    }

    // Update UI with User Info
    if (user) {
        const userNameEl = document.getElementById('userName');
        const userRoleEl = document.getElementById('userRoleText');
        if (userNameEl) userNameEl.textContent = user.name;
        if (userRoleEl) userRoleEl.textContent = user.role;
    }

    // Sidebar Toggle
    const sidebar = document.getElementById('sidebar');
    const topbar = document.getElementById('topbar');
    const mainContent = document.getElementById('main-content');
    const sidebarToggle = document.getElementById('sidebarToggle');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            topbar.classList.toggle('expanded');
            mainContent.classList.toggle('expanded');
            
            // On mobile, use a backdrop or just show/hide
            if (window.innerWidth < 992) {
                sidebar.classList.toggle('show');
            }
        });
    }

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlTag = document.documentElement;

    // Load saved theme
    const savedTheme = localStorage.getItem('academix_theme') || 'light';
    htmlTag.setAttribute('data-bs-theme', savedTheme);
    if (darkModeToggle) {
        darkModeToggle.checked = savedTheme === 'dark';
        
        darkModeToggle.addEventListener('change', () => {
            const theme = darkModeToggle.checked ? 'dark' : 'light';
            htmlTag.setAttribute('data-bs-theme', theme);
            localStorage.setItem('academix_theme', theme);
        });
    }

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutBtnDropdown = document.getElementById('logoutBtnDropdown');

    if (logoutBtn) logoutBtn.addEventListener('click', (e) => { e.preventDefault(); logout(); });
    if (logoutBtnDropdown) logoutBtnDropdown.addEventListener('click', (e) => { e.preventDefault(); logout(); });
});
