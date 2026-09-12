import React from "react";
import Header from "../components/LoginHeader.jsx";
import LoginForm from "../components/LoginForm.jsx";

/**
 * Composes the application login page with an ultra-modern immersive background and ambient lighting.
 *
 * @returns {JSX.Element} The login page.
 */
function Login() {
  return (
    <div className="min-h-screen w-full bg-slate-950 relative flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      {/* Absolute Ambient Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[250px] h-[250px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-md w-full mx-auto space-y-6">
        <Header />
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
