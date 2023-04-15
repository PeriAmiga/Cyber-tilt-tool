import LoginPage from "./LoginPage";
import Lobby from "./Lobby";
import Layout from "./Layout";
import Template from "./Template";
import React, {useState} from "react";
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
      return(
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Layout />}>
                      <Route index element={<Lobby />} />
                      <Route path="/lobby" element={<Lobby />} />
                      <Route path="/login" element={<LoginPage />} />
                  </Route>
              </Routes>
          </BrowserRouter>);
}

export default App;
