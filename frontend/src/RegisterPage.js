import React, {useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [error = "", setError] = useState("");
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    function handleClick(e){
        e.preventDefault();
        let email = emailRef.current.value;
        let username = usernameRef.current.value;
        let password = passwordRef.current.value;

        if (email === "" || username === "" || password === "")
        {
            if(email === "")
            {
                setError('Please Enter an Email');
            }
            else if(username === "")
            {
                setError('Please Enter a Username');
            }
            else
            {
                setError('Please Enter a Password');
            }
        }
        else if (password.length < 10)
        {
            setError('Please write a password with 10 letter or more');
        }
        else
        {
            // create the user and save it in the db
            setError('');
            alert("The user created successfully");
            navigate('/login');
        }
    }

    return (
            <form id="registerpanel">
                <h1 id="litheader">Register</h1>
                <div className="inset">
                    <p>
                        <input type="text" name="email" id="email" placeholder="Email" ref={emailRef}/>
                    </p>
                    <p>
                        <input type="text" name="username" id="username" placeholder="User Name" ref={usernameRef}/>
                    </p>
                    <p>
                        <input type="password" name="password" id="password" placeholder="Password" ref={passwordRef}/>
                    </p>
                </div>
                <div className="p-container" id="registerError">{error}</div>
                <p className="p-container">
                    <button onClick={handleClick}>Register</button>
                </p>
            </form>
    );
} export default RegisterPage;