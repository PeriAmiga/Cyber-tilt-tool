import React, {useRef, useState} from 'react'
import {useNavigate} from "react-router-dom";

export default function EmailValidation() {
    const [error = "", setError] = useState("");
    const navigate = useNavigate();
    const emailRef = useRef(null);

    function handleClick(e){
        e.preventDefault();
        let email = emailRef.current.value;

        if (email === "")
        {
            setError('Please Enter an email');
        }
        else
        {
            // check the email in the db if exist
            // send email with code and write the code in the db
            setError('');
            navigate('/cv');
        }
    }


    return (
        <div>
            <form id="emailValidationpanel">
                <h1 id="litheader">Email Validation</h1>
                <div className="inset">
                    <p>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email"
                            ref={emailRef}
                        />
                    </p>
                </div>
                <div className="p-container" id="emailValidationError">{error}</div>
                <p className="p-container" id="button">
                    <button onClick={handleClick}>Get Email</button>
                </p>
            </form>
        </div>
    )
}