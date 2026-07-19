import AppRoutes from "./routes/AppRoutes";
import AuthProvider from '../src/features/auth/AuthProvider'
// Pages Imports
function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
