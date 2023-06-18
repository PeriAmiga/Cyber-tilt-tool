import React, {useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {apiGet} from './services/apiService';

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
                setUser(user.data);
            } catch (error) {
                setUser(null)
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
        user.isSysAdmin === true && (
        <form id="registerpanel">
            <h1 id="litheader">Company - Registration</h1>
            <div className="inset">
                <p>
                    <label htmlFor="register-input">Company Name:</label>
                    <input type="text" name="company" id="company" placeholder="Company" ref={companyRef} />
                </p>
                <p>
                    <label htmlFor="register-input">Address:</label>
                    <input type="text" name="address" id="address" placeholder="Address" ref={addressRef} />
                </p></div>
            <div className="p-container" id="registerError">{error}</div>
            <p className="p-container">
                <button onClick={handleClick}>Register Company</button>
            </p>
        </form>)
    );
} export default RegisterCompany;