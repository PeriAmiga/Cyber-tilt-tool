import React, {useRef, useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import { apiGet } from "./services/apiService";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert'

export default function NewPassword() {
    const [error = "", setError] = useState("");
    const navigate = useNavigate();
    const newPasswordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z](?=.*[@#$%^&+=!]).{10,}$/;

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
        let newPassword = newPasswordRef.current.value;
        let confirmPassword = confirmPasswordRef.current.value;

        function validatePass(pass) {
            return regex.test(pass)
        }

        if (newPassword === "" || confirmPassword === "")
        {
            if (newPassword === "")
            {
                setError('Please Enter a new password');
            }
            else
            {
                setError('Please Enter a confirm password');
            }
        }
        else if (!validatePass(newPassword)) {
            setError('Password must contain 10 characters and at least one number, one uppercase letter, and one lowercase letter.');
        }
        else
        {
            if (newPassword !== confirmPassword)
            {
                setError('The new password is not match to the confirm password');
            }
            else
            {
                // check that the new password not equal to the old
                // save the new password in the db
                setError('');
                alert("The password changed successfully");
                navigate('/login');
            }
        }
    }


    return (
        user !== null && (<div>
            <form id="newpasswordpanel">
                <h1 id="litheader">New Password</h1>
                <br/>
                <Container className="newPassPage">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Enter New Password</InputGroup.Text>
                        <Form.Control
                            type="password" name="newPassword" id="newPassword" placeholder="New Password" ref={newPasswordRef}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Enter Confirm Password</InputGroup.Text>
                        <Form.Control
                            type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" ref={confirmPasswordRef}
                        />
                    </InputGroup>
                    {error !== "" && <Alert id="newPasswordError" key='warning' variant='warning'>{error}</Alert>}
                </Container>
                <Button onClick={handleClick}>Change Password</Button>
            </form>
        </div>)
    )
}