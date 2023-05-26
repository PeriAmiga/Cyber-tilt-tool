import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

export default function Profile() {
    const [fullName, setFullName] = useState('Nissim Gerame');
    const [email, setEmail] = useState('nissim@example.com');
    const [phone, setPhone] = useState('1234567890');
    const [birthdate, setBirthdate] = useState('1990-01-01');
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    const handleSave = () => {
        // Save changes to the user's email and phone number
        // Here you can make an API call to update the user's profile

        // Disable edit mode
        setEditMode(false);
    };

    const handleSetFullName = (event) => {
        setFullName(event.target.value);
    };

    const handleSetBirthdate = (event) => {
        setBirthdate(event.target.value);
    };

    return (
        <div>
            <h2>Profile</h2>
            <div>
                <label htmlFor="fullName">Full Name:</label>
                <span id="fullName">{fullName}</span>
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
                <span id="birthdate">{birthdate}</span>
            </div>
            {editMode && <button onClick={handleSave}>Save</button>}
            <button onClick={() => setEditMode(!editMode)}>
                {editMode ? 'Cancel' : 'Edit'}
            </button>
            <button onClick={() => navigate('/changepassword')}>Change Password</button>
        </div>
    );
}
