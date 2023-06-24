import React, {useEffect, useRef, useState} from 'react'
import {useNavigate, useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert'
import {apiGet} from "./services/apiService";

export default function EmailValidation() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const emailRef = useRef(null);

    async function handleClick(e){
        e.preventDefault();
        let email = emailRef.current.value;

        if (email === "")
        {
            setError('Please Enter an email');
        }
        else
        {
            const res = await sendTokenEmail(email);
            if(res) {
                setError('');
                navigate('/cv', {state: {email}});
            }
        }
    }

    async function sendTokenEmail(email) {
        try {
            return await apiGet('/auth/sendMail', {email: email});
        } catch (error) {
            setError("The Email did not send, please try again")
        }
    }

    return (
        <div>
            <form id="emailValidationpanel">
                <h1 id="litheader">Email Validation</h1>
                <br/>
                <Container className="evPage">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Enter Email</InputGroup.Text>
                        <Form.Control
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email"
                            ref={emailRef}
                        />
                    </InputGroup>
                    {error !== "" && <Alert id="emailValidationError" key='warning' variant='warning'>{error}</Alert>}
                </Container>
                <Button onClick={handleClick}>Get Email</Button>
            </form>
        </div>
    )
}