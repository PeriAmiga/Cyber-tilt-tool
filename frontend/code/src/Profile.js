import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { apiGet } from "./services/apiService";
import "./Containers.css";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export default function Profile() {

    const [user, setUser] = useState("")
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();


    useEffect( () => {
        async function getUser() {
            try {
                const res = await apiGet('/auth/whoami');
                setUser(res.data);

            } catch (error) {
                setUser(null)
                navigate('/error')
            }
        }
        getUser();
    }, []);


    const handleSave = () => {
        // TODO: Save changes to the user's email and phone number

        // Disable edit mode
        setEditMode(false);
    };

    return (
        user !== null && (
            <Container className="profilePage">
            <h1>Profile</h1>
            <br/>
                <InputGroup className="mb-3 profileInputs">
                    <InputGroup.Text id="basic-addon1">Full Name</InputGroup.Text>
                    <Form.Control
                        placeholder="Full Name"
                        aria-label="Full Name"
                        aria-describedby="basic-addon1"
                        value={user.fullName}
                        disabled
                    />
                </InputGroup>
                <InputGroup className="mb-3 profileInputs">
                    <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                    {editMode? <Form.Control
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /> : <Form.Control
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                        value={user.email}
                        disabled
                    />}
                </InputGroup>
                <InputGroup className="mb-3 profileInputs">
                    <InputGroup.Text id="basic-addon1">Phone</InputGroup.Text>
                    {editMode? <Form.Control
                        placeholder="Phone"
                        aria-label="Phone"
                        aria-describedby="basic-addon1"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    /> : <Form.Control
                        placeholder="Phone"
                        aria-label="Phone"
                        aria-describedby="basic-addon1"
                        value={user.phone}
                        disabled
                    />}
                </InputGroup>
                <InputGroup className="mb-3 profileInputs">
                    <InputGroup.Text id="basic-addon1">Birth Date</InputGroup.Text>
                    <Form.Control
                        placeholder="Birth Date"
                        aria-label="Birth Date"
                        aria-describedby="basic-addon1"
                        value={user.birthdate}
                        disabled
                    />
                </InputGroup>
                {editMode && <Button onClick={handleSave} variant="success">Save</Button>}
            <Button style={{"margin-left": "10px"}} variant="secondary" onClick={() => setEditMode(!editMode)}>
                {editMode ? 'Cancel' : 'Edit'}
            </Button>
            <br/><br/>
            <Button variant="primary" onClick={() => navigate('/changepassword')}>Change Password</Button>
        </Container>)
    );
}
