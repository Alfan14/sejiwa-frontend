"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN_NAME } from "../constants/apiConstants";

export default function RegistrationForm() {
  const router = useRouter();

  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    role: "",
    successMessage: null,
    errorMessage: null
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const sendDetailsToServer = () => {
    if (state.email && state.password && state.username && state.role) {
      setState((prev) => ({ ...prev, errorMessage: null }));

      const payload = {
        email: state.email,
        password: state.password,
        username: state.username,
        role: state.role
      };

      axios
        .post("https://sejiwa.onrender.com/api/signup", payload)
        .then((response) => {
          if (response.status === 200) {
            setState((prevState) => ({
              ...prevState,
              successMessage: "Registration successful. Redirecting to home...",
              errorMessage: null
            }));
            localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
            redirectToHome();
          } else {
            setState((prev) => ({
              ...prev,
              errorMessage: "Unexpected server response."
            }));
          }
        })
        .catch((error) => {
          console.error(error);
          setState((prev) => ({
            ...prev,
            errorMessage: "Server error: " + error.message
          }));
        });
    } else {
      setState((prev) => ({
        ...prev,
        errorMessage: "Please fill in all fields."
      }));
    }
  };

  const redirectToHome = () => {
    router.push("/home");
  };

  const redirectToLogin = () => {
    router.push("/login");
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      sendDetailsToServer();
    } else {
      setState((prev) => ({
        ...prev,
        errorMessage: "Passwords do not match"
      }));
    }
  };

  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      <form>
        <div className="form-group text-left">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Add User Name"
            value={state.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={state.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={state.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="role">Choose a Role</label>
          <select
            id="role"
            className="form-control"
            value={state.role}
            onChange={handleChange}
          >
            <option value="">-- Select Role --</option>
            <option value="pelajar">Pelajar</option>
            <option value="konselor">Konselor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          type="submit"
          className="btn btn-primary mt-3"
          onClick={handleSubmitClick}
        >
          Register
        </button>
      </form>

      {state.successMessage && (
        <div className="alert alert-success mt-2" role="alert">
          {state.successMessage}
        </div>
      )}

      {state.errorMessage && (
        <div className="alert alert-danger mt-2" role="alert">
          {state.errorMessage}
        </div>
      )}

      <div className="mt-2">
        <span>Already have an account? </span>
        <span className="loginText" onClick={redirectToLogin}>
          Login here
        </span>
      </div>
    </div>
  );
}