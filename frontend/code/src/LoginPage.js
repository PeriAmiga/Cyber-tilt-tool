import React, { useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { apiPost } from "./services/apiService"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

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
                setError('Please Enter an Email');
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
                <br/>
                <Container className="loginPage">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                        <Form.Control
                            type="email" name="email" id="email" placeholder="Email" ref={emailRef}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                        <Form.Control
                            type="password" name="password" id="password" placeholder="Password" ref={passwordRef}
                        />
                    </InputGroup>
                    {error !== "" && <Alert id="loginError" key='warning' variant='warning'>{error}</Alert>}
                </Container>
                <Button onClick={handleClick}>Login</Button>
                <br/>
                <a href="/ev" className="rstpassword">Forget your password?</a>
            </form>
        </div>
    )
}