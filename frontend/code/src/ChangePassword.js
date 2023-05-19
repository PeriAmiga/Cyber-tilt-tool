import React, {useRef, useState} from 'react'
import {useNavigate} from "react-router-dom";

export default function ChangePassword() {
    const [error = "", setError] = useState("");
    const navigate = useNavigate();
    const oldPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);

    function handleClick(e){
        e.preventDefault();
        let oldPassword = oldPasswordRef.current.value;
        let newPassword = newPasswordRef.current.value;

        if (oldPassword === "" || newPassword === "")
        {
            if(oldPassword === "")
            {
                setError('Please Enter an old password');
            }
            else
            {
                setError('Please Enter an new password');
            }
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


    return (
        <div>
            <form id="changepasswordpanel">
                <h1 id="litheader">Change Password</h1>
                <div className="inset">
                    <p>
                        <input type="password" name="oldPassword" id="oldPassword" placeholder="Old Password" ref={oldPasswordRef}/>
                    </p>
                    <p>
                        <input type="password" name="newPassword" id="newPassword" placeholder="New Password" ref={newPasswordRef}/>
                    </p>
                </div>
                <div className="p-container" id="changePasswordError">{error}</div>
                <p className="p-container">
                    <button onClick={handleClick}>Change Password</button>
                </p>
            </form>
        </div>
    )
}