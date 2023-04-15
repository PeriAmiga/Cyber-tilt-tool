import React from 'react'

export default function LoginPage(props) {
    return (
        <div>
            <form id="loginpanel">
                <h1 id="litheader">Login</h1>
                <div className="inset">
                    <p>
                        <input type="text" name="username" id="username" placeholder="User Name"/>
                    </p>
                    <p>
                        <input type="password" name="password" id="password" placeholder="Password"/>
                    </p>
                </div>
                <div className="p-container" id="loginError"></div>
                <p className="p-container">
                    <input type="submit" id="login" value="Login"/>
                </p>
                <a href="#" className="rstpassword">Forget your password?</a>
            </form>
        </div>
    )
}