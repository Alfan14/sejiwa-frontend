"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Josefin_Slab } from "next/font/google";
import { AuthService } from "../service/AuthService";

const josefinSlab = Josefin_Slab({
  variable: "--font-josefin-slab",
  subsets: ["latin"],
});

export default function Form() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await AuthService.login(email, password);
      console.log("Login Successful:", response);

      router.push("/home");
    } catch (err) {
      console.error("Login error:", err?.response?.data || err.message);
      setError(err?.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmitClick}>
        <div className="form-group text-left">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <small className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className="form-group text-left">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <div className="registerMessage mt-3">
        <span>Don't have an account? </span>
        <span
          className="loginText text-blue-600 cursor-pointer"
          onClick={() => router.push("/register")}
        >
          Register
        </span>
      </div>
    </div>
  );
}
