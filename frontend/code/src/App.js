import LoginPage from "./LoginPage";
import Layout from "./Layout";
import RegisterPage from "./RegisterPage";
import EmailValidation from "./EmailValidation"
import CodeValidation from "./CodeValidation";
import ChangePassword from "./ChangePassword"
import NewPassword from "./NewPassword"
import Home from "./Home"
import Reports from "./Reports"
import Profile from "./Profile";
import CompanyUsers from "./CompanyUsers";
import SystemUsers from "./SystemUsers";
import CompanyAuthorization from "./CompanyAuthorization";
import SystemAuthorization from "./SystemAuthorization"
import CompanyManagement from "./CompanyManagement"
import React, {createContext, useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const UserContext = createContext();

function App() {

    const [user, setUser] = useState(null);

    const updateUser = (userData) => {
        setUser(userData);
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<LoginPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/ev" element={<EmailValidation />} />
                        <Route path="/cv" element={<CodeValidation />} />
                        <Route path="/changepassword" element={<ChangePassword />} />
                        <Route path="/newpassword" element={<NewPassword />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/companyusers" element={<CompanyUsers />} />
                        <Route path="/systemusers" element={<SystemUsers />} />
                        <Route path="/companyauthorization" element={<CompanyAuthorization />} />
                        <Route path="/systemauthorization" element={<SystemAuthorization />} />
                        <Route path="/companymanagement" element={<CompanyManagement />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
            );
}

export default App;