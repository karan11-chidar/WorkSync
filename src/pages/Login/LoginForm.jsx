import React, { useState } from 'react'
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { login } from '../../features/auth/authService';
import { useNavigate } from 'react-router-dom';
function LoginForm() {
  const [formData,setFormData ] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password:'',
  })
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [signInBtn, setSignInBtn] = useState('Sign In');
  const validateLoginForm = ({email,password}) => {
    const errors = {
      email: '',
      password:''
    }
     errors.email = (email === '' || email==='abc@gmail.com') ? '❌ Please enter a valid email.' : '';
     errors.password = (password === '' || password.length < 6) ? '❌ Please enter a valid password.' : '';
    const isValid = (errors.email === '' && errors.password === '') ? true : false;
    return {isValid, errors}
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
  let userCredential;
    const formErrors = validateLoginForm(formData);
    if (!formErrors.isValid) {
      console.log('Validation UnSuccessful');
      setErrors(formErrors.errors);
      return;
    }
    console.log("Validation Successful");
    try {
      setIsDisabled(true);
      setSignInBtn('Signing');
      userCredential = await login(formData);
    } catch (error) {
     alert('❌ Login Failed :'+ error.message)
    }
    finally {
      setIsDisabled(false);
      setSignInBtn('Sign In');
    }
    if (userCredential) {
          setFormData({
            email: "",
            password: "",
          });
          setErrors({
            email: "",
            password: "",
          });
      navigate("/admin/dashboard");
      } ;
  }
    return (
      <div className=" sm:mx-auto sm:w-full mt-5 w-full max-w-md mx-auto">
        <div className="bg-slate-800 py-8 px-6 shadow-xl rounded-3xl border border-slate-700/60 sm:px-10">
          <h1 className="text-white text-2xl font-medium font-sans text-center mb-5">
            Login Form
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@gmail.com"
                  className="block w-full pl-10 pr-3 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all font-medium font-sans"
                />
              </div>
              {errors.email && (
                <span className="text-[0.725rem] text-red-500 ml-2 ">
                  {errors.email}
                </span>
              )}
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
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={formData.password}
                  required
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all font-medium"
                />
              </div>
              {errors.password && (
                <span className="text-[0.725rem]  text-red-500 ml-2  ">
                  {errors.password}
                </span>
              )}
            </div>
            <div>
              <button
                disabled={isDisabled}
                className={`disabled:opacity-50 disabled:cursor-not-allowed w-full h-11  flex justify-center items-center gap-2 px-4 border border-transparent rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-all cursor-pointer shadow-md`}
              >
                {signInBtn} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default LoginForm
