import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from './services/apiService';

function RegisterPage() {
    const [error = "", setError] = useState("");
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const fullNameRef = useRef(null);
    const passwordRef = useRef(null);
    const phoneRef = useRef(null);
    const birthDateRef = useRef(null);
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z](?=.*[@#$%^&+=!]).{10,}$/;

    // Set maximum date to today's date
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const maxDate = yyyy + '-' + mm + '-' + dd;

    async function handleClick(e) {

        function validatePass(pass) {
            return regex.test(pass)
        }

        e.preventDefault();
        let email = emailRef.current.value;
        let fullName = fullNameRef.current.value;
        let password = passwordRef.current.value;
        let phone = phoneRef.current.value;
        let birthDate = birthDateRef.current.value;

        if (email === "" || fullName === "" || password === "" || phone === "" || birthDate === "") {
            if (fullName === "") {
                setError('Please Enter a Full Name');
            }
            else if (email === "") {
                setError('Please Enter an Email');
            }
            else if (password === "") {
                setError('Please Enter a Password');
            }
            else if (phone === "") {
                setError('Please Enter a Phone Number');
            }
            else {
                setError('Please Enter a Birth Date');
            }
        }
        else if (!validatePass(password)) {
            setError('Password must contain 10 characters and at least one number, one uppercase letter, and one lowercase letter.');
        }
        else {
            console.log('birthDate', birthDate)
            await apiPost('/user/register', {
                "password": password,
                "email": email,
                "fullName": fullName,
                "phone": phone,
                "birthdate": birthDate,
                "companyID": 1, // TODO: Moshe&Peri - setting (Login)
                "isSysAdmin": false, // TODO: peri - only SysAdmin
                "isCompanyAdmin": false, // TODO: peri - only CompanyAdmin
                "isActive": true // TODO: peri - admin and company
            })
            setError('');
            alert("The user created successfully");
            navigate('/login');
        }
    }

    return (
        <form id="registerpanel">
            <h1 id="litheader">Register</h1>
            <div className="inset">
                <p>
                    <label htmlFor="register-input">Full Name:</label>
                    <input type="text" name="fullName" id="fullName" placeholder="Full Name" ref={fullNameRef} />
                </p>
                <p>
                    <label htmlFor="register-input">Email:</label>
                    <input type="text" name="email" id="email" placeholder="Email" ref={emailRef} />
                </p>
                <p>
                    <label htmlFor="register-input">Password:</label>
                    <input type="password" name="password" id="password" placeholder="Password" ref={passwordRef} />
                </p>
                <p>
                    <label htmlFor="register-input">Phone Number:</label>
                    <input type="text" name="phone" id="phone" placeholder="Enter phone number" ref={phoneRef} onKeyPress={(event) => {
                        const keyCode = event.keyCode || event.which; const keyValue = String.fromCharCode(keyCode); const regex = /[0-9]/;
                        if (!regex.test(keyValue)) { event.preventDefault(); }
                    }} />
                </p>
                <p>
                    <label htmlFor="register-input">BirthDate:</label>
                    <input type="date" name="birthdate" id="birthdate" max={maxDate} ref={birthDateRef} placeholder="Select birthdate" onKeyDown={(e) => e.preventDefault()} />
                </p></div>
            <div className="p-container" id="registerError">{error}</div>
            <p className="p-container">
                <button onClick={handleClick}>Register</button>
            </p>
        </form>
    );
} export default RegisterPage;