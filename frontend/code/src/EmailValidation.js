import React, {useRef, useState} from 'react'
import {useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert'

export default function EmailValidation() {
    const [error = "", setError] = useState("");
    const navigate = useNavigate();
    const emailRef = useRef(null);

    function handleClick(e){
        e.preventDefault();
        let email = emailRef.current.value;

        if (email === "")
        {
            setError('Please Enter an email');
        }
        else
        {
            // check the email in the db if exist
            // send email with code and write the code in the db
            setError('');
            navigate('/cv');
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