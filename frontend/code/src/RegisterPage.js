import React, {useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {apiGet, apiPost} from './services/apiService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

function RegisterPage() {
    const [error = "", setError] = useState("");
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const fullNameRef = useRef(null);
    const companyRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const phoneRef = useRef(null);
    const birthDateRef = useRef(null);
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z](?=.*[@#$%^&+=!]).{10,}$/;

    const [user, setUser] = useState("")

    useEffect(() => {
        async function getUser() {
            try {
                const user = await apiGet('/auth/whoami');
                if (!user.data.isSysAdmin && !user.data.isCompanyAdmin)
                    throw Error();
                setUser(user.data);
            } catch (error) {
                setUser(null);
                navigate('/error');
            }
        }
        getUser();

    }, []);


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
        let company = companyRef.current.value;
        let password = passwordRef.current.value;
        let confirmPassword = confirmPasswordRef.current.value;
        let phone = phoneRef.current.value;
        let birthDate = birthDateRef.current.value;

        if (fullName === "" || company === "" || email === "" || password === "" || confirmPassword === "" || phone === "" || birthDate === "") {
            if (fullName === "") {
                setError('Please Enter a Full Name');
            }
            else if (company === "") {
                setError('Please Enter a Company');
            }
            else if (email === "") {
                setError('Please Enter an Email');
            }
            else if (password === "") {
                setError('Please Enter a Password');
            }
            else if (confirmPassword === "")
            {
                setError('Please Enter your new password again');
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
        else if (password !== confirmPassword)
        {
            setError('The passwords are not match');
        }
        else {
            await apiPost('/user/register', {
                "password": password,
                "email": email,
                "fullName": fullName,
                "phone": phone,
                "birthdate": birthDate,
                "companyID": 2, // TODO: Moshe - casting the company name to id
                "isSysAdmin": false,
                "isCompanyAdmin": false,
                "isActive": true
            })
            setError('');
            alert("The user created successfully");
            navigate('/login');
        }
    }

    return ( user && (<form id="registerpanel">
            <h1 id="litheader">Register</h1>
            <br/>
            <Container className="registerPage">
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Full Name</InputGroup.Text>
                    <Form.Control
                        type="text" name="fullName" id="fullName" placeholder="Full Name" ref={fullNameRef}
                    />
                </InputGroup>


                { user.isSysAdmin === true && <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Company</InputGroup.Text>
                    <Form.Control
                        type="text" name="company" id="company" placeholder="Company" ref={companyRef}
                    />
                </InputGroup>}
                { user.isSysAdmin === false && user.isCompanyAdmin === true && <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Company</InputGroup.Text>
                    <Form.Control
                        type="text" name="company" id="company" placeholder="Company" ref={companyRef} value={user.companyName} disabled
                    />
                </InputGroup>}
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                    <Form.Control
                        type="email" name="email" id="email" placeholder="Email" ref={emailRef}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                    <Form.Control
                        type="password" name="password" id="password" placeholder="Password" ref={passwordRef}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Confirm Password</InputGroup.Text>
                    <Form.Control
                        type="password" name="password" id="confirmPassword" placeholder="Confirm Password" ref={confirmPasswordRef}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Phone Number</InputGroup.Text>
                    <Form.Control
                        type="tel" name="phone" id="phone" placeholder="Enter phone number" ref={phoneRef} onKeyPress={(event) => {
                        const keyCode = event.keyCode || event.which; const keyValue = String.fromCharCode(keyCode); const regex = /[0-9]/;
                        if (!regex.test(keyValue)) { event.preventDefault(); }
                    }}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Birth Date</InputGroup.Text>
                    <Form.Control
                        type="date" name="birthdate" id="birthdate" max={maxDate} ref={birthDateRef} placeholder="Select birthdate" onKeyDown={(e) => e.preventDefault()}
                    />
                </InputGroup>
                {error !== "" && <Alert id="registerError" key='warning' variant='warning'>{error}</Alert>}
            </Container>
            <Button onClick={handleClick}>Register</Button>
        </form>)
    );
} export default RegisterPage;