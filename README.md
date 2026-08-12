# WorkSync

## Overview

WorkSync is a workforce management application built with React and Tailwind CSS. It provides a modern, responsive interface for managing employees, attendance, departments, leave requests, and administrative workflows.

The application is designed for administrators and employees, offering distinct dashboards and tools for both roles.

## Key Features

- Employee directory with search, filtering, and profile management
- Department management and budget overview
- Attendance tracking with daily status reporting
- Leave request submission and approval workflow
- Dashboard analytics for workforce performance
- Responsive UI for desktop and mobile devices

## Built With

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React Icons
- Firebase (configuration present)
- Sonner for toast notifications

## Project Architecture

The application follows a modular structure to keep domain logic organized and maintainable.

- `src/app/routes` - routing and protected route handling
- `src/app/layouts` - application layouts for admin and employee views
- `src/features` - feature-specific modules for admin, auth, and employee workflows
- `src/pages` - page-level components and views
- `src/shared` - common components, utilities, and shared services
- `src/firebase` - Firebase configuration and initialization

## Directory Structure

```text
src/
  app/
    routes/
      AppRoutes.jsx
      ProtectedRoute.jsx
    layouts/
      AdminLayout.jsx
      EmployeeLayout.jsx
  features/
    admin/
      dashboard/
      departments/
      employeeDirectory/
      ...
    auth/
      components/
      context/
      pages/
      services/
    employee/
  shared/
    components/
    services/
    utils/
  firebase/
    firebaseConfig.js
  main.jsx
  index.css
```

## Getting Started

### Prerequisites

- Node.js 18+ or compatible LTS version
- npm 10+ or pnpm/yarn if preferred

### Installation

```bash
git clone https://github.com/karan11-chidar/WorkSync.git
cd WorkSync
npm install
```

### Run Locally

```bash
npm run dev
```

Open the local development server URL shown in the terminal.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - start the Vite development server
- `npm run build` - build the production bundle
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint across the project

## Development Notes

- Authentication state is managed through `src/features/auth/context`.
- Admin and employee routes are separated by layout and route guards.
- UI components are kept reusable under `src/shared/components`.
- Feature-specific business logic, services, and validations are colocated with related pages.

## Future Enhancements

- Backend integration with REST API and persistent database
- Role-based access control and permissions
- JWT authentication and secure session handling
- Real-time updates and notifications
- File uploads and export reports
- Analytics dashboards and payroll capabilities

## Contributing

1. Fork the repository
2. Create a topic branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is currently private. Update this section with a license when the project is open sourced.

---

## 🎓 Learning Outcomes

This project demonstrates:

- React Component Architecture
- State Management
- Props Handling
- Reusable UI Components
- LocalStorage Persistence
- Responsive Design Principles
- Dashboard Design
- CRUD Operations
- Modern Frontend Development

---

## 👨‍💻 Author

Karan Chidar

B.Tech Computer Science Engineering

Frontend Developer | React Developer | Java Full Stack Learner

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub and share your feedback.

---

### Built with ❤️ using React & Tailwind CSS
