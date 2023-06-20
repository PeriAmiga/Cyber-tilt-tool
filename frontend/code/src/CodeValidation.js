import React, {useRef, useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import { apiGet } from "./services/apiService";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

export default function CodeValidation() {
    const [error = "", setError] = useState("");
    const navigate = useNavigate();
    const codeRef = useRef(null);

    const [user, setUser] = useState("");
    useEffect(() => {
        async function getUser() {
            try {
                const user = await apiGet('/auth/whoami');
                setUser(user.data);
            } catch (error) {
                setUser(null)
                navigate('/error');
            }
            return
        }
        getUser();

    }, []);


    function handleClick(e){
        e.preventDefault();
        let code = codeRef.current.value;

        if (code === "")
        {
            setError('Please Enter a code');
        }
        else
        {
            // check the code in the db if exist and equal
            //write what will happen if not equal
            setError('');
            navigate('/newpassword');
        }
    }


    return (
        user !== null && (<div>
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
        </div>)
    )
}