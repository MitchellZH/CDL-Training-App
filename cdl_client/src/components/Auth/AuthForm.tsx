import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import api from "../../api/axios";

interface AuthFormProps {
  type: "login" | "register";
}

interface ErrorResponse {
  error: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const endpoint = type === "login" ? "/auth/login" : "/auth/register";
    try {
      const response = await api.post(endpoint, { email, password });
      setMessage(`Success: ${type === "login" ? "Logged in!" : "Registered!"}`);
      if (type === "login") {
        localStorage.setItem("token", response.data.token); // Save the token for login
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response) {
          const { status, data } = axiosError.response;
          if (status === 400) {
            setMessage(`Error: ${data.error || "Invalid input data."}`);
          } else if (status === 401) {
            setMessage("Error: Unauthorized. Please check your credentials.");
          } else {
            setMessage(`Error: ${data.error || "Unexpected server error."}`);
          }
        } else {
          setMessage("Error: Network issue or unexpected error.");
        }
      } else {
        setMessage("Error: An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
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
      <button onClick={handleSubmit}>
        {type === "login" ? "Log In" : "Register"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AuthForm;
