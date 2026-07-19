import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "../src/features/auth/AuthProvider";
import PremiumLoader from "./components/Animations/PremiumLoader";
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
