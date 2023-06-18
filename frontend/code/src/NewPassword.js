import React, {useRef, useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import { apiGet } from "./services/apiService";

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
                setError('Please Enter an new password');
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
                <div className="inset">
                    <p>
                        <input type="password" name="newPassword" id="newPassword" placeholder="New Password" ref={newPasswordRef}/>
                    </p>
                    <p>
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" ref={confirmPasswordRef}/>
                    </p>
                </div>
                <div className="p-container" id="newPasswordError">{error}</div>
                <p className="p-container">
                    <button onClick={handleClick}>Change Password</button>
                </p>
            </form>
        </div>)
    )
}