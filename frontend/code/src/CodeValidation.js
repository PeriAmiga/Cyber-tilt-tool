import React, {useRef, useState} from 'react'
import {useNavigate} from "react-router-dom";

export default function CodeValidation() {
    const [error = "", setError] = useState("");
    const navigate = useNavigate();
    const codeRef = useRef(null);

    function handleClick(e){
        e.preventDefault();
        let code = codeRef.current.value;

        if (code === "")
        {
            setError('Please Enter a code');
        }
        else
        {
            // check the code in the db if exist and equal
            //write what will happen if not equal
            setError('');
            navigate('/changepassword');
        }
    }


    return (
        <div>
            <form id="codeValidationpanel">
                <h1 id="litheader">Code Validation</h1>
                <div className="inset">
                    <p>
                        <input
                            type="text"
                            name="code"
                            id="code"
                            placeholder="Code"
                            ref={codeRef}
                        />
                    </p>
                </div>
                <div className="p-container" id="codeValidationError">{error}</div>
                <p className="p-container" id="button">
                    <button
                        onClick={handleClick}
                    >Validate Code</button>
                </p>
            </form>
        </div>
    )
}