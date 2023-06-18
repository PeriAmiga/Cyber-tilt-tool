import React, {useState, useEffect} from 'react'
import './Home.css';
import {useNavigate} from "react-router-dom";
import { apiGet } from "./services/apiService";

export default function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState("")

    useEffect(() => {
        async function getUser() {
            try {
                const user = await apiGet('/auth/whoami');
                setUser(user.data);
            } catch (error) {
                setUser(null);
                navigate('/error');
            }
            return
        }
        getUser();

    }, []);
    console.log(user);

    return (
        user !== null && (<div id="home">
            <h1 style={{color: 'black'}}>Welcome To Cyber Tilt Tool Project</h1>
            <br />
            <div className='button-container'>
                <button className='button-92' onClick={() => navigate('/profile')}>Profile</button>
                <button className='button-92' onClick={() => navigate('/reports')}>Reports</button>
                <button className='button-92' onClick={() => navigate('/companyusers')}>Company Users</button>
                <button className='button-92' onClick={() => navigate('/systemusers')}>System Users</button>
                { user.isCompanyAdmin === true && <button className='button-92' onClick={() => navigate('/companyauthorization')}>Company - Authorization</button>}
                { user.isSysAdmin === true && <button className='button-92' onClick={() => navigate('/systemauthorization')}>System - Authorization</button>}
                { user.isSysAdmin === true && <button className='button-92' onClick={() => navigate('/companymanagement')}>Company - Management</button>}
            </div>
        </div>)
    )
}