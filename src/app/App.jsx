import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "../features/auth/context/AuthProvider";
import PremiumLoader from "../shared/components/Animations/PremiumLoader";
// Pages Imports
/**
 * Root application component that mounts the application routes and providers.
 *
 * @returns {JSX.Element} The application shell.
 */
function App() {
  return (
    <AuthProvider>
      <PremiumLoader />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
