import React from 'react'
import { Link } from "react-router-dom";

export default function Lobby() {
    return (
        <div>
            <form id="indexpanel">
                <h1 id="litheader">Welcome to Communication LTD</h1>
                <br />
                <p className="p-container">
                    <Link to='/login'><button>Login</button></Link>
                </p>
                <p className="p-container">
                    <input type="submit" id="register" value="Register" />
                </p>
            </form>
        </div>
    )
}