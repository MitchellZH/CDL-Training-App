import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";

const App: React.FC = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} key="home" />
      <Route path="/login" element={<LoginPage />} key="login" />
      <Route path="/register" element={<RegisterPage />} key="register" />
      <Route path="/dashboard" element={<DashboardPage />} key="dashboard" />
    </Routes>
  </BrowserRouter>
);

export default App;
