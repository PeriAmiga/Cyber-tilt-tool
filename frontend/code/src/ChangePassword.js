import React, {useRef, useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import { apiGet } from "./services/apiService";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert'

export default function ChangePassword() {
    const [error = "", setError] = useState("");
    const navigate = useNavigate();
    const oldPasswordRef = useRef(null);
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
            return;
        }
        getUser();

    }, []);


    async function handleClick(e){
        e.preventDefault();
        let oldPassword = oldPasswordRef.current.value;
        let newPassword = newPasswordRef.current.value;
        let confirmPassword = confirmPasswordRef.current.value;

        function validatePass(pass) {
            return regex.test(pass)
        }

        if (oldPassword === "" || newPassword === "" || confirmPassword === "")
        {
            if(oldPassword === "")
            {
                setError('Please Enter an old password');
            }
            else if (newPassword === "")
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
                const res = await changePassword(user.email, oldPassword, newPassword);
                if(res) {
                    setError('');
                    alert("The password changed successfully");
                    navigate('/login');
                }
            }
        }
    }

    async function changePassword(email, oldPassword, newPassword) {
        try {
            return await apiGet('/auth/changePassword', {email: email, oldPassword: oldPassword, newPassword: newPassword});
        } catch (error) {
            setError(error.response.data)
        }
    }


    return (
        user !== null && (<div>
            <form id="changepasswordpanel">
                <h1 id="litheader">Change Password</h1>
                <br/>
                <Container className="changePassPage">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Enter Old Password</InputGroup.Text>
                        <Form.Control
                            type="password" name="oldPassword" id="oldPassword" placeholder="Old Password" ref={oldPasswordRef}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Enter New Password</InputGroup.Text>
                        <Form.Control
                            type="password" name="newPassword" id="newPassword" placeholder="New Password" ref={newPasswordRef}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Confirm New Password</InputGroup.Text>
                        <Form.Control
                            type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" ref={confirmPasswordRef}
                        />
                    </InputGroup>
                    {error !== "" && <Alert id="changePasswordError" key='warning' variant='warning'>{error}</Alert>}
                </Container>
                <Button onClick={handleClick}>Change Password</Button>
            </form>
        </div>)
    )
}