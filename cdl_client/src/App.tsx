import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegisterPage";
import TrainingModulesPage from "./pages/TrainingModulesPage";

const App: React.FC = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} key="home" />
      <Route path="/login" element={<LoginPage />} key="login" />
      <Route path="/register" element={<RegisterPage />} key="register" />
      <Route path="/dashboard" element={<DashboardPage />} key="dashboard" />
      <Route
        path="/admin/training-modules"
        element={<TrainingModulesPage />}
        key="admin-training-modules"
      />
      ;
    </Routes>
  </BrowserRouter>
);

export default App;
