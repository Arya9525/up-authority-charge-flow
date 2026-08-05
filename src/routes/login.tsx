import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Landmark,
  ShieldCheck,
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("role", "admin");
        navigate({ to: "/admin" });
      return;
    }

    if (username === "user" && password === "user123") {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("role", "user");
        navigate({ to: "/portal" });
      return;
    }

    alert("Invalid Username or Password");
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-50">
      {/* Top tricolor accent strip */}
      <div className="hidden lg:block fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-white to-green-600 z-50" />

      {/* LEFT */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-14 text-white">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop')",
          }}
        />
        {/* Blue overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-800/90 to-blue-950/95" />
        {/* Watermark ring */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full border-[16px] border-white/5" />

        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 border border-white/20 backdrop-blur-sm p-4 rounded-xl">
              <Landmark size={32} strokeWidth={1.75} />
            </div>

            <div>
              <h2 className="text-2xl font-bold leading-tight">
                User Charge Management
              </h2>
              <p className="text-blue-200 mt-1 text-sm">
                Uttar Pradesh Development Authority
              </p>
            </div>
          </div>

          <div className="mt-16 max-w-md">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              Secure Government Portal
            </h1>

            <p className="mt-6 text-base text-blue-100/90 leading-7">
              Unified platform for Scheme Management, Plot Management, User
              Charge Collection, Demand Generation, Online Payment, Receipt
              Download and Recovery Monitoring.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-6 pt-8 border-t border-white/15">
          <div>
            <h1 className="text-3xl font-bold">48</h1>
            <p className="text-blue-200 text-sm mt-1">Schemes</p>
          </div>

          <div>
            <h1 className="text-3xl font-bold">36,412</h1>
            <p className="text-blue-200 text-sm mt-1">Plots</p>
          </div>

          <div>
            <h1 className="text-3xl font-bold">₹412 Cr</h1>
            <p className="text-blue-200 text-sm mt-1">Collection</p>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex justify-center items-center p-6 sm:p-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-md p-8 sm:p-10">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center">
              <ShieldCheck className="text-blue-700" size={32} strokeWidth={1.75} />
            </div>

            <h2 className="text-3xl font-bold mt-5 text-gray-900">Sign In</h2>

            <p className="text-gray-500 mt-2 text-sm">
              User Charge Management System
            </p>
          </div>

          <div className="mt-8">
            <label className="font-semibold text-sm text-gray-800">
              Username
            </label>

            <div className="relative mt-2">
              <User
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
                strokeWidth={2}
              />
              <input
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="font-semibold text-sm text-gray-800">
              Password
            </label>

            <div className="relative mt-2">
              <Lock
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
                strokeWidth={2}
              />

              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-11 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="mt-8 w-full bg-blue-800 hover:bg-blue-900 text-white p-3.5 rounded-lg font-semibold flex justify-center items-center gap-2 transition shadow-sm"
          >
            Login
            <ArrowRight size={18} />
          </button>

          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
  <h3 className="mb-3 text-sm font-semibold text-blue-900">
    Demo Login Credentials
  </h3>

  <div className="space-y-3 text-sm">
    <div className="rounded-lg bg-white p-3 border border-blue-100">
      <p className="font-semibold text-gray-900">👨‍💼 Admin Portal</p>
      <p className="text-gray-600">
        <span className="font-medium">Username:</span> admin
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Password:</span> admin123
      </p>
    </div>

    <div className="rounded-lg bg-white p-3 border border-blue-100">
      <p className="font-semibold text-gray-900">👤 Allottee Portal</p>
      <p className="text-gray-600">
        <span className="font-medium">Username:</span> user
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Password:</span> user123
      </p>
    </div>
  </div>

  <p className="mt-3 text-xs text-gray-500">
    This is a demonstration prototype. These credentials are provided for testing purposes only.
  </p>
</div>
        </div>
      </div>
    </div>
  );
}