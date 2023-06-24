import React, {useRef, useState, useEffect} from 'react'
import { useNavigate, useLocation as useRouterLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import {apiGet} from "./services/apiService";

export default function CodeValidation() {
    const [error = "", setError] = useState("");
    const navigate = useNavigate();
    const codeRef = useRef(null);
    const routerLocation = useRouterLocation();
    const email = routerLocation?.state?.email;

    useEffect(()=>{
        if(!email)
            navigate('/error');
    },[email]);

    async function handleClick(e){
        e.preventDefault();
        let code = codeRef.current.value;

        if (code === "")
        {
            setError('Please Enter a code');
        }
        else
        {
            const res = await sendTokenEmail(email, code);
            console.log(res);
            if(res) {
                setError('');
                navigate('/newpassword', {state: {email}});
            }
        }
    }

    async function sendTokenEmail(email, token) {
        try {
            return await apiGet('/auth/checkToken', {email: email, token: token});
        } catch (error) {
            setError("The code did not send, please try again");
        }
    }


    return (
        email && <div>
            <form id="codeValidationpanel">
                <h1 id="litheader">Code Validation</h1>
                <br/>
                <Container className="cvPage">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Enter Code</InputGroup.Text>
                        <Form.Control
                            type="text"
                            name="code"
                            id="code"
                            placeholder="Code"
                            ref={codeRef}
                        />
                    </InputGroup>
                    {error !== "" && <Alert id="codeValidationError" key='warning' variant='warning'>{error}</Alert>}
                </Container>
                <Button onClick={handleClick}>Validate Code</Button>
            </form>
        </div>
    )
}