import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {apiGet, apiPost} from "./services/apiService";
import "./Containers.css";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export default function Profile() {

    const [user, setUser] = useState("")
    const [fullName, setFullName] = useState("");
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
        setPhone(user.phone);
        setFullName(user.fullName);
    }, []);

    const logout = async () => {
        await apiPost('/auth/logout', null);
        navigate('/login');
        document.location.reload();
    };

    async function handleSave (){
        const updatedFullName = document.getElementById("fullName").value;
        const updatedPhone = document.getElementById("phone").value;
        let temp = { ...user };
        temp.fullName = updatedFullName;
        temp.phone = updatedPhone;
        setUser(temp);

        const res = await updateProfile(user.email, temp.fullName, temp.phone);
        if(res) {
            alert("The profile has been updated successfully");
            logout();
        }

        // Disable edit mode
        setEditMode(false);
    };

    async function updateProfile(email, fullName, phone) {
        try {
            return await apiGet('/auth/updateProfile', {email: email, fullName: fullName, phone: phone});
        } catch (error) {
            alert("Something didn't work, please try again.");
        }
    }

    return (
        user !== null && (
            <Container className="profilePage">
            <h1>Profile</h1>
            <br/>
            <InputGroup className="mb-3 profileInputs">
                <InputGroup.Text id="basic-addon1">Full Name</InputGroup.Text>
                {editMode? <Form.Control
                    id="fullName"
                    placeholder="Full Name"
                    aria-label="Full Name"
                    aria-describedby="basic-addon1"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                /> : <Form.Control
                    id="fullName"
                    placeholder="Full Name"
                    aria-label="Full Name"
                    aria-describedby="basic-addon1"
                    value={user.fullName}
                    disabled
                />}
            </InputGroup>
            <InputGroup className="mb-3 profileInputs">
                <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                <Form.Control
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    value={user.email}
                    disabled
                />
            </InputGroup>
            <InputGroup className="mb-3 profileInputs">
                <InputGroup.Text id="basic-addon1">Phone</InputGroup.Text>
                {editMode? <Form.Control
                    id="phone"
                    placeholder="Phone"
                    aria-label="Phone"
                    aria-describedby="basic-addon1"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                /> : <Form.Control
                    id="phone"
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
            <Button style={{"margin-left": "10px"}} variant="secondary" onClick={() => {
                if(editMode){
                    document.location.reload();
                }
                setEditMode(!editMode)}}>
                {editMode ? 'Cancel' : 'Edit'}
            </Button>
            <br/><br/>
            <Button variant="primary" onClick={() => navigate('/changepassword')}>Change Password</Button>
        </Container>)
    );
}