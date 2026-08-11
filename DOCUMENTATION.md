# WorkSync Documentation

WorkSync is a React-based workforce management application for administrators and employees. It uses Firebase Authentication for sign-in and Cloud Firestore for application data.

## Requirements

- Node.js 18 or a current LTS release
- npm
- A Firebase project with Authentication and Cloud Firestore enabled

## Install and run

```bash
npm install
npm run dev
```

Vite prints the local address after it starts. To create a production build, run:

```bash
npm run build
npm run preview
```

Use `npm run lint` to check the codebase with ESLint.

## Firebase configuration

Create a `.env` file in the project root. Do not commit it; it is already excluded by `.gitignore`.

```env
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_PROJECT_ID=your-project-id
VITE_STORAGE_BUCKET=your-project.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
VITE_MEASUREMENT_ID=your_measurement_id
```

These variables are read in `src/firebase/firebaseConfig.js`. Obtain their values from **Firebase Console > Project settings > Your apps > SDK setup and configuration**.

> Note: the application reads `VITE_STORAGE_BUCKET`. If an existing local `.env` uses `VITE_STOREAGE_BUCKET`, rename it to the spelling above.

### Firebase services to enable

1. In **Authentication**, enable the Email/Password provider and create the users who can sign in.
2. In **Firestore Database**, create a database and add a profile document for each authenticated user.
3. The profile document must use the Firebase Authentication user ID as its document ID and include a `role` field of either `admin` or `employee`.

Example profile document:

```json
{
  "name": "Avery Sharma",
  "email": "avery@example.com",
  "role": "employee"
}
```

WorkSync combines the Firebase user with this profile on sign-in. A user without a profile, or with an unsupported role, is redirected to the login page.

## Access and routes

| User | Route | Purpose |
| --- | --- | --- |
| Everyone | `/` | Sign in |
| Admin | `/admin/dashboard` | Organisation dashboard |
| Admin | `/admin/departments` | Department management |
| Admin | `/admin/employees` | Employee directory |
| Admin | `/admin/tasks` | Task board |
| Admin | `/admin/attendance` | Today's attendance |
| Admin | `/admin/leaves` | Leave ledger |
| Employee | `/employee/dashboard` | Personal dashboard |
| Employee | `/employee/leaves` | Leave requests and history |
| Employee | `/employee/attendance` | Attendance overview |
| Employee | `/employee/tasks` | Assigned tasks |
| Employee | `/employee/profile` | Personal profile |

Routes are guarded by `ProtectedRoute`, which checks the authenticated profile's `role`. Direct navigation to a route outside a user's role is not permitted.

## Typical workflows

### Administrator

- Maintain departments and the employee directory.
- Review organisation attendance and leave records.
- Create and manage work in the task board.
- Use the dashboard for a high-level view of workforce activity.

### Employee

- Review assigned work and update task-related activity.
- Record and review attendance.
- Submit leave requests and review leave history.
- View or update personal profile information where the interface allows it.

## Project structure

```text
src/
  app/                 Application entry and route definitions
  features/            Domain modules: authentication and admin features
  layouts/             Admin and employee portal shells
  pages/               Page-level views for each portal
  shared/              Reusable components and shared services
  firebase/            Firebase initialisation
```

Authentication state is provided through `features/auth/context`. Admin employee and department screens have dedicated context providers; their data services and validation logic live beside their related feature modules.

## Deployment

Run `npm run build` and deploy the generated `dist` directory to a static hosting provider. Configure the same `VITE_*` variables in the host's build environment before building. The included `netlify.toml` supports Netlify deployment.

For single-page application hosting, configure the host to serve `index.html` for unknown application routes so browser navigation to protected URLs continues to work.
