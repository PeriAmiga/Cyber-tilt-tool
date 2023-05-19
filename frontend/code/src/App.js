import LoginPage from "./LoginPage";
import Lobby from "./Lobby";
import Layout from "./Layout";
import RegisterPage from "./RegisterPage";
import EmailValidation from "./EmailValidation"
import CodeValidation from "./CodeValidation";
import ChangePassword from "./ChangePassword"
import Home from "./Home"
import Reports from "./Reports"
import Template from "./Template";
import React from "react";
// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Lobby />} />
                    <Route path="/lobby" element={<Lobby />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/ev" element={<EmailValidation />} />
                    <Route path="/cv" element={<CodeValidation />} />
                    <Route path="/changepassword" element={<ChangePassword />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/template" element={<Template />} />
                </Route>
            </Routes>
        </BrowserRouter>);
}

export default App;