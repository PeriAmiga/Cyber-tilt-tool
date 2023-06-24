import React, {useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {apiGet} from './services/apiService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

function RegisterCompany() {
    const [error = "", setError] = useState("");
    const navigate = useNavigate();
    const companyRef = useRef(null);
    const addressRef = useRef(null);

    const [user, setUser] = useState("")

    useEffect(() => {
        async function getUser() {
            try {
                const user = await apiGet('/auth/whoami');
                if (!user.data.isSysAdmin)
                    throw Error();
                setUser(user.data);
            } catch (error) {
                setUser(null);
                navigate('/error');
            }
            return
        }
        getUser();

    }, []);

    async function handleClick(e) {
        let company = companyRef.current.value;
        let address = addressRef.current.value;

        if (company === "" || address === "") {
            if (company === "") {
                setError('Please Enter a Company Name');
            } else {
                setError('Please Enter an Address of the company');
            }
        } else {
            // await apiPost('/user/register', { // TODO: api for registration of company
            //     "password": password,
            //     "email": email,
            //     "fullName": fullName,
            //     "phone": phone,
            //     "birthdate": birthDate,
            //     "companyID": 1, // TODO: Moshe - casting the company name to id
            //     "isSysAdmin": false, // TODO: peri - only SysAdmin
            //     "isCompanyAdmin": false, // TODO: peri - only CompanyAdmin
            //     "isActive": true // TODO: peri - admin and company
            // })
            setError('');
            alert("The company created successfully");
            navigate('/home');
        }
    }

    return (
        user && (
        <form id="registerpanel">
            <h1 id="litheader">Company - Registration</h1>
            <br/>
            <Container className="companyRegisterPage">
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Company Name</InputGroup.Text>
                    <Form.Control
                        type="text" name="company" id="company" placeholder="Company" ref={companyRef}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Address</InputGroup.Text>
                    <Form.Control
                        type="text" name="address" id="address" placeholder="Address" ref={addressRef}
                    />
                </InputGroup>
                {error !== "" && <Alert id="registerError" key='warning' variant='warning'>{error}</Alert>}
            </Container>
            <Button onClick={handleClick}>Register Company</Button>
        </form>)
    );
} export default RegisterCompany;