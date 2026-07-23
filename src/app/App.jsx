import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "../features/auth/context/AuthProvider";
import PremiumLoader from "../shared/components/Animations/PremiumLoader";
// Pages Imports
function App() {
  return (
    <AuthProvider>
      <PremiumLoader />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
