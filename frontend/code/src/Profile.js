import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { apiGet } from "./services/apiService";
import "./Profile.css";

export default function Profile() {

    const [user, setUser] = useState("")
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function getUser() {
            try {
                const res = await apiGet('/auth/whoami');
                setUser(res.data);

                setPhone(user.phone)
                setEmail(user.email)


            } catch (error) {
                setUser(null)
                navigate('/error')
            }
            return
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
            <div class="profilePage">
            <h1>Profile</h1>
            <br/>
                <ul class="list-group">
            <li class="list-group-item">
                <label htmlFor="fullName">Full Name:</label>
                <span id="fullName">{user.fullName}</span>
            </li>
            <li class="list-group-item">
                <label htmlFor="email">Email:</label>
                {editMode ? (
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                ) : (
                    <span id="email">{user.email}</span>
                )}
            </li>
            <li class="list-group-item">
                <label htmlFor="phone">Phone:</label>
                {editMode ? (
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                ) : (
                    <span id="phone">{user.phone}</span>
                )}
            </li>
            <li class="list-group-item">
                <label htmlFor="birthdate">Birthdate:</label>
                <span id="birthdate">{user.birthdate}</span>
            </li>
                </ul>
                {editMode && <button onClick={handleSave}>Save</button>}
                <br/>
            <button onClick={() => setEditMode(!editMode)}>
                {editMode ? 'Cancel' : 'Edit'}
            </button>
            <button onClick={() => navigate('/changepassword')}>Change Password</button>
        </div>)
    );
}
