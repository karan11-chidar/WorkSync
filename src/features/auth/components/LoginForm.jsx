import React, { useEffect, useState } from "react";
import { Mail, Lock, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import {
  toastError,
  toastLoading,
  toastSuccess,
} from "../../../shared/services/toastService";

/**
 * Renders the user sign-in form with interactive demo credentials and robust error handling.
 *
 * @returns {JSX.Element} The login form.
 */
function LoginForm() {
  const { showLoader, hideLoader, user } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [signInBtn, setSignInBtn] = useState("Sign In");

  const validateLoginForm = ({ email, password }) => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!email.trim()) {
      newErrors.email = "❌ Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "❌ Please enter a valid email format.";
    }

    if (!password) {
      newErrors.password = "❌ Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "❌ Password must be at least 6 characters long.";
    }

    const isValid = !newErrors.email && !newErrors.password;
    return { isValid, errors: newErrors };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Quick fill helper for Demo logins
  const handleDemoLogin = async (role) => {
    const credentials =
      role === "admin"
        ? {
            email: "admin@workplace.com",
            password: "adminpassword123",
          }
        : {
            email: "employee@workplace.com",
            password: "employeepassword123",
          };

    try {
      setIsDisabled(true);
      setSignInBtn("Signing In...");
      showLoader("login");

      const toastId = toastLoading("Logging into demo account...");

      await login(credentials);

      toast.dismiss(toastId);
      toastSuccess("Demo Login Successful!", `Welcome to the ${role} demo.`);
    } catch (error) {
      toastError(`Demo Login Failed: ${error.message}`);
      hideLoader();
    } finally {
      setIsDisabled(false);
      setSignInBtn("Sign In");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateLoginForm(formData);
    if (!formErrors.isValid) {
      setErrors(formErrors.errors);
      return;
    }

    let toastId = null;
    try {
      setIsDisabled(true);
      setSignInBtn("Signing In...");
      showLoader("login");
      toastId = toastLoading("Authenticating credentials...");

      await login(formData);

      toastSuccess("Login Successful!", `Welcome back, ${formData.email}`);
    } catch (error) {
      toastError(`Authentication Failed: ${error.message}`);
      hideLoader();
    } finally {
      setIsDisabled(false);
      setSignInBtn("Sign In");
      if (toastId) {
        toast.dismiss(toastId);
      }
    }
  };

  useEffect(() => {
    if (!user) return;
    setFormData({ email: "", password: "" });
    setErrors({ email: "", password: "" });

    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user.role === "employee") {
      navigate("/employee/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="sm:mx-auto sm:w-full mt-5 w-full max-w-md mx-auto">
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
                placeholder="your.email@gmail.com"
                className="block w-full pl-10 pr-3 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all font-medium font-sans"
              />
            </div>
            {errors.email && (
              <span className="text-[0.725rem] text-red-400 font-medium mt-1 block ml-2">
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
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="block w-full pl-10 pr-3 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all font-medium"
              />
            </div>
            {errors.password && (
              <span className="text-[0.725rem] text-red-400 font-medium mt-1 block ml-2">
                {errors.password}
              </span>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isDisabled}
              className="disabled:opacity-50 disabled:cursor-not-allowed w-full h-11 flex justify-center items-center gap-2 px-4 border border-transparent rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-all cursor-pointer shadow-md"
            >
              {signInBtn} <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Refined Demo Login Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              className="w-full h-10 flex justify-center items-center gap-2 px-3 border border-emerald-500/30 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/50 focus:outline-hidden transition-all cursor-pointer shadow-xs"
            >
              <ShieldCheck className="h-4 w-4" /> Demo Admin
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("employee")}
              className="w-full h-10 flex justify-center items-center gap-2 px-3 border border-amber-500/30 rounded-xl text-xs font-bold text-amber-400 bg-amber-950/40 hover:bg-amber-900/50 focus:outline-hidden transition-all cursor-pointer shadow-xs"
            >
              <UserCheck className="h-4 w-4" /> Demo Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
