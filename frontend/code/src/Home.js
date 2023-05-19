import React from 'react'
import './Home.css';

export default function Home() {
    return (
        <div id="home">
            <h1 style={{color: 'white'}}>Welcome To Cyber Tilt Tool Project</h1>
            <br />
            <div className='button-container'>
                <button className='button-92'>Profile</button>
                <button className='button-92'>Reports</button>
                <button className='button-92'>Company Users</button>
                <button className='button-92'>System Users</button>
                <button className='button-92'>Company - Authorization</button>
                <button className='button-92'>System - Authorization</button>
            </div>
        </div>
    )
}
