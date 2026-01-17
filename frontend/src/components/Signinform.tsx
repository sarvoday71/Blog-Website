import { Link, useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { signinInput } from "@sarvoday17/common";
import Loader from "./loader";
import axios from "axios";

function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const reqBody = { email, password };
    const parsed = signinInput.safeParse(reqBody);
    if (!parsed.success) {
      console.error("Validation failed:", parsed.error.flatten().fieldErrors);
      alert("Validation error.");
      return;
    }
    setLoading(true);
    try {
      const data = await axios.post(
        "https://backend.sarvodayjadhav17.workers.dev/api/v1/user/signin",
        reqBody,
      );
      console.log(data);
      localStorage.setItem("token", data.data.jwt);
      navigate("/blogs");
    } catch (error) {
      alert("Error while signing up, Please try later!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f6fa] to-[#e5e9f2] py-16 px-4">
      <div className="w-full max-w-lg bg-white/90 border border-gray-200 rounded-3xl shadow-2xl p-12 flex flex-col items-center animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3 text-center tracking-tight drop-shadow-xl">
          Sign in to your account
        </h1>
        <p className="mb-8 text-gray-500 text-center text-lg">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-semibold"
          >
            Create Account
          </Link>
        </p>
        <form className="space-y-6 w-full" onSubmit={handleSubmit}>
          <LableComponent type="email" onchange={setEmail} value={email} />
          <LableComponent
            type="password"
            onchange={setPassword}
            value={password}
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full py-3 font-bold text-lg shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all tracking-wide"
            disabled={loading}
          >
            {loading ? <Loader /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

interface lablecomp {
  type: string;
  value: string;
  onchange: (asd: string) => void;
}

function LableComponent({ type, value, onchange }: lablecomp) {
  return (
    <div>
      <label
        htmlFor={type}
        className="block font-semibold mb-1 text-gray-700 text-base"
      >
        {type === "username"
          ? "Username"
          : type === "password"
            ? "Password"
            : "Email"}
      </label>
      <input
        id={type}
        value={value}
        type={type}
        onChange={(e) => onchange(e.target.value)}
        placeholder={
          type === "username"
            ? "Enter your Username"
            : type === "email"
              ? "m@example.com"
              : ""
        }
        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900 text-base shadow-sm transition-all"
      />
    </div>
  );
}

export default SigninForm;
