import { getCurrentUser, logout } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    initCustomSelects();
    // Check Authentication
    const user = getCurrentUser();
    if (!user && !window.location.pathname.includes('login.html')) {
        window.location.href = './login.html';
        return;
    }

    // Role-Based UI Rendering
    if (user) {
        renderSidebarByRole(user.role);
        
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
            if (window.innerWidth < 992) sidebar.classList.toggle('show');
        });
    }

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlTag = document.documentElement;
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

function renderSidebarByRole(role) {
    const nav = document.getElementById('mainNav');
    if (!nav) return;

    // Define all possible links
    const links = [
        { id: 'dashboard', href: 'index.html', icon: 'bi-grid-fill', label: 'Dashboard', roles: ['admin', 'teacher', 'student', 'parent'] },
        { id: 'students', href: 'students.html', icon: 'bi-people-fill', label: 'Students', roles: ['admin', 'teacher'] },
        { id: 'teachers', href: 'teachers.html', icon: 'bi-person-badge-fill', label: 'Teachers', roles: ['admin'] },
        { id: 'fees', href: 'fees.html', icon: 'bi-wallet2', label: 'Fees & Finance', roles: ['admin', 'parent'] },
        { id: 'exams', href: 'exams.html', icon: 'bi-journal-text', label: 'Exams', roles: ['admin', 'teacher', 'student'] },
        { id: 'library', href: 'library.html', icon: 'bi-book-half', label: 'Library', roles: ['admin', 'teacher', 'student'] },
        { id: 'settings', href: 'settings.html', icon: 'bi-gear-fill', label: 'Settings', roles: ['admin', 'teacher', 'student', 'parent'], dividerBefore: true },
    ];

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    let navHtml = '';
    links.forEach(link => {
        if (link.roles.includes(role)) {
            if (link.dividerBefore) navHtml += '<hr class="mx-4 my-3 text-secondary opacity-25">';
            const isActive = currentPath === link.href ? 'active' : '';
            navHtml += `<a href="${link.href}" class="nav-link ${isActive}"><i class="bi ${link.icon}"></i><span>${link.label}</span></a>`;
        }
    });

    navHtml += '<a href="#" id="logoutBtn" class="nav-link text-danger"><i class="bi bi-box-arrow-right"></i><span>Logout</span></a>';
    nav.innerHTML = navHtml;

    // Re-bind logout after dynamic injection
    document.getElementById('logoutBtn').addEventListener('click', (e) => { e.preventDefault(); logout(); });
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
                if (hiddenInput) hiddenInput.value = value;

                // Update active state
                items.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                
                // Trigger change event if needed
                const event = new CustomEvent('change', { detail: { value: value } });
                dropdown.dispatchEvent(event);
            });
        });
    });
}
