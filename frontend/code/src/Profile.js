import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {apiGet} from "./services/apiService";

export default function Profile() {

    const [user, setUser] = useState("")

    useEffect(() => {
        async function getUser() {
            try {
                const user = await apiGet('/auth/whoami');
                setUser(user.data);
            } catch (error) {
                setUser(null)
            }
            return
        }
        getUser();

    }, []);

    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [birthdate] = useState(user.birthdate);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();



    const handleSave = () => {
        // ToDo: Save changes to the user's email and phone number

        // Disable edit mode
        setEditMode(false);
    };


    return (
        <div>
            <h2>Profile</h2>
            <div>
                <label htmlFor="fullName">Full Name:</label>
                <span id="fullName">{user.fullName}</span>
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                {editMode ? (
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                ) : (
                    <span id="email">{email}</span>
                )}
            </div>
            <div>
                <label htmlFor="phone">Phone:</label>
                {editMode ? (
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                ) : (
                    <span id="phone">{phone}</span>
                )}
            </div>
            <div>
                <label htmlFor="birthdate">Birthdate:</label>
                <span id="birthdate">{user.birthdate}</span>
            </div>
            {editMode && <button onClick={handleSave}>Save</button>}
            <button onClick={() => setEditMode(!editMode)}>
                {editMode ? 'Cancel' : 'Edit'}
            </button>
            <button onClick={() => navigate('/changepassword')}>Change Password</button>
        </div>
    );
}
