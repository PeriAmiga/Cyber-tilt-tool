import React, { useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { apiPost } from "./services/apiService"


export default function LoginPage() {
    const [error = "", setError] = useState("");
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    async function handleClick(e) {
        e.preventDefault();
        let email = emailRef.current.value;
        let password = passwordRef.current.value;

        if (email === "" || password === "") {
            if (email === "") {
                setError('Please Enter a Username');
            }
            else {
                setError('Please Enter a Password');
            }
        }
        else {
            try {
                await apiPost('/auth/login', {
                    "email": email,
                    "password": password
                });
                // Code to execute if the request is successful
                setError('');
                navigate('/home');
                window.location.reload();
            } catch (error) {
                // Code to handle the error
                alert("the details you have entered are wrong, please try again")
            }
        }
    }


    return (
        <div>
            <form id="loginpanel">
                <h1 id="litheader">Login</h1>
                <div className="inset">
                    <p>
                        <input type="text" name="email" id="email" placeholder="Email" ref={emailRef} />
                    </p>
                    <p>
                        <input type="password" name="password" id="password" placeholder="Password" ref={passwordRef} />
                    </p>
                </div>
                <div className="p-container" id="loginError">{error}</div>
                <p className="p-container">
                    <button onClick={handleClick}>Login</button>
                </p>
                <a href="/ev" className="rstpassword">Forget your password?</a>
            </form>
        </div>
    )
}