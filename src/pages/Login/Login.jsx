import React from 'react'
import Header from '../../components/Header.jsx';
import LoginForm from './LoginForm';
function Login() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Header />
      <LoginForm />
    </div>
  );
}

export default Login
