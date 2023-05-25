import React from 'react'
import './Home.css';
import {useNavigate} from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();


    return (
        <div id="home">
            <h1 style={{color: 'white'}}>Welcome To Cyber Tilt Tool Project</h1>
            <br />
            <div className='button-container'>
                <button className='button-92' onClick={() => navigate('/profile')}>Profile</button>
                <button className='button-92' onClick={() => navigate('/reports')}>Reports</button>
                <button className='button-92' onClick={() => navigate('/companyusers')}>Company Users</button>
                <button className='button-92' onClick={() => navigate('/systemusers')}>System Users</button>
                <button className='button-92' onClick={() => navigate('/companyauthorization')}>Company - Authorization</button>
                <button className='button-92' onClick={() => navigate('/systemauthorization')}>System - Authorization</button>
            </div>
        </div>
    )
}
