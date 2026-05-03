# Academix System - Gemini Context

This project is a production-ready **School Management SaaS Dashboard** built with **Angular 21**.

## Project Overview

Academix is a modern, responsive enterprise application designed for school administration. It features a scalable architecture using Angular's latest standalone component model and signal-based state management.

### Tech Stack
- **Framework:** Angular 21 (Standalone Components, SSR/SSG support)
- **State Management:** Angular Signals (Zoneless architecture)
- **UI Framework:** Bootstrap 5.3+ (SCSS integration)
- **Icons:** Bootstrap Icons
- **Build Tool:** Angular CLI / Vite

### Architecture
The project follows a modular, feature-based directory structure:
- **`core/`**: Centralized singleton services (e.g., `AuthService`), global guards (`AuthGuard`), and structural layout components (`Sidebar`, `Topbar`, `MainLayout`).
- **`features/`**: Business-specific modules implemented as standalone components:
  - `auth/`: Multi-step login (Password + OTP) and sign-up flows.
  - `dashboard/`: Overview with analytics cards and recent activity.
  - `students/`: Management list with real-time signal-based filtering.
  - `teachers/`: Faculty directory and profiles.
  - `finance/`: Fee tracking and transaction history.
  - `exams/`: Schedule and grading management.
  - `library/`: Digital and physical book catalog.
- **`assets/scss/`**: Centralized design system with variables and mixins.

## Building and Running

### Development
1. Navigate to the root directory.
2. Install dependencies: `npm install`
3. Start the dev server: `npm start` (or `ng serve`)
4. Open `http://localhost:4200/`

### Production
- **Build:** `npm run build`
- **Serve SSR:** `npm run serve:ssr:erp`

## Development Conventions

### Component Standards
- **Standalone:** All new components MUST be `standalone: true`.
- **File Separation:** Every component MUST have separate `.ts`, `.html`, and `.scss` files. No inline templates or styles allowed.
- **Naming:** Follow standard Angular kebab-case (e.g., `student-list.component.ts`).

### State and Logic
- **Signals:** Prefer **Angular Signals** (`signal`, `computed`, `effect`) over `RxJS` for internal component state and simple shared state.
- **Zoneless:** The project is configured for Zoneless change detection. Avoid manual `ChangeDetectorRef` calls.
- **Reactive Forms:** Use `ReactiveFormsModule` for all authentication and management forms.

### Styling
- **SCSS:** Use SCSS only. Do not create `.css` files.
- **Variables:** Always use defined variables in `assets/scss/_variables.scss` for colors, spacing, and gradients.
- **Bootstrap:** Leverage Bootstrap utility classes first before writing custom CSS.
- **Gradients:** Use the predefined gradient utilities (`bg-gradient-primary`, etc.) for SaaS branding.

### Routing
- **Lazy Loading:** All feature modules are lazy-loaded via `loadComponent` in `app.routes.ts`.
- **Guards:** Protect all internal dashboard routes using `authGuard`.
