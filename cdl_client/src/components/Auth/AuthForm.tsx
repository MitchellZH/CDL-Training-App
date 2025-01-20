import React, { useState, useContext } from "react";
import axios from "axios";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface AuthFormProps {
  type: "login" | "register";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const { login } = useContext(AuthContext); // Use login from AuthContext
  const navigate = useNavigate(); // Initialize navigate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    const endpoint = type === "login" ? "/auth/login" : "/auth/register";
    try {
      const response = await api.post(endpoint, { email, password });
      setMessage("Success: Logged in!");
      login(response.data.token);
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || "Unexpected error.";
        setMessage(`Error: ${errorMessage}`);
      } else {
        setMessage("Error: An unexpected error occurred.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{type === "login" ? "Login" : "Register"}</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">
        {type === "login" ? "Log In" : "Register"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default React.memo(AuthForm);
