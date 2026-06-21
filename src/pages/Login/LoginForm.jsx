import React, { useState } from 'react'
import { Mail,Lock,ArrowRight} from 'lucide-react';
function LoginForm() {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userDetails);
    setUserDetails({
      email: '',
      password:''
   })
  }
    return (
      <div className=" sm:mx-auto sm:w-full mt-6 w-full max-w-md mx-auto">
        <div className="bg-slate-800 py-8 px-6 shadow-xl rounded-3xl border border-slate-700/60 sm:px-10">
          <h1 className="text-white text-2xl font-medium font-sans text-center">
            Login Form
          </h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <input
                  name='email'
                  type="email"
                  value={userDetails.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@gmail.com"
                  className="block w-full pl-10 pr-3 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all font-medium font-sans"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="h-4.5 w-4.5" />
                </div>
                <input
                  name='password'
                  type="password"
                  onChange={handleChange}
                  value={userDetails.password}
                  required
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all font-medium"
                />
              </div>
            </div>
            <div>
              <button
                className="w-full h-11 flex justify-center items-center gap-2 px-4 border border-transparent rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-all cursor-pointer shadow-md"
              >
                Sign In <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default LoginForm
