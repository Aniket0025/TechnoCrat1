import React, { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  redirectTo?: string;
}

export default function Login({ redirectTo = "/" }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState("");
  const [showReset, setShowReset] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(redirectTo);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="mb-4 flex items-center gap-2 text-green-700 border border-green-200 px-3 py-1 rounded hover:bg-green-50 transition self-start"
        style={{ marginLeft: 0 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back
      </button>
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mb-3 w-full p-2 border rounded text-gray-900 placeholder-gray-600 bg-gray-100 focus:bg-white focus:border-green-500"
          required
          style={{ color: '#222', background: '#f8f9fa', fontWeight: 500 }}
        />
        <div className="relative mb-1 w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-2 border rounded text-gray-900 placeholder-gray-600 bg-gray-100 focus:bg-white focus:border-green-500"
            required
            style={{ color: '#222', background: '#f8f9fa', fontWeight: 500 }}
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-green-700 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12.001c1.64 4.19 5.82 7.25 10.066 7.25 1.807 0 3.525-.427 5.02-1.18M7.5 12a4.5 4.5 0 118.998 0A4.5 4.5 0 017.5 12zm0 0a4.5 4.5 0 008.998 0A4.5 4.5 0 007.5 12zm0 0a4.5 4.5 0 008.998 0A4.5 4.5 0 007.5 12z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9.75l-7.5 7.5m0 0l7.5-7.5m-7.5 7.5A10.477 10.477 0 011.934 12.001c1.64-4.19 5.82-7.25 10.066-7.25 1.807 0 3.525.427 5.02 1.18" />
              </svg>
            )}
          </button>
        </div>
        <div className="mb-3 w-full text-right">
          <button type="button" className="text-green-700 text-sm underline hover:text-green-900" onClick={() => setShowReset(true)}>
            Forgot password?
          </button>
        </div>
        {showReset && (
          <div className="mb-3 w-full bg-green-50 border border-green-200 rounded p-3">
            <div className="mb-1 text-sm text-gray-700">Enter your email to reset password:</div>
            <input
              type="email"
              className="w-full p-2 border rounded text-gray-900 placeholder-gray-600 bg-white mb-2"
              placeholder="Email"
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
              required
            />
            <button
              type="button"
              className="w-full bg-green-600 text-white py-1.5 rounded hover:bg-green-700 text-sm font-semibold"
              onClick={async () => {
                setResetError(""); setResetSent(false);
                try {
                  await sendPasswordResetEmail(auth, resetEmail);
                  setResetSent(true);
                } catch (err) {
                  setResetError((err as Error).message || "Could not send reset email.");
                }
              }}
            >
              Send Reset Link
            </button>
            {resetSent && <div className="text-green-700 mt-2 text-xs">Reset link sent! Check your email.</div>}
            {resetError && <div className="text-red-600 mt-2 text-xs">{resetError}</div>}
            <button type="button" className="text-xs text-gray-500 underline mt-2" onClick={() => setShowReset(false)}>
              Cancel
            </button>
          </div>
        )}
        {error && <div className="text-red-500 mb-3">{error}</div>}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          New user? <a href="/auth/signup" className="text-green-700 underline">Sign up</a>
        </div>
      </form>
    </div>
  );
}
