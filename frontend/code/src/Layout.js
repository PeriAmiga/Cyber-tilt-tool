import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
//import NavDropdown from "react-bootstrap/NavDropdown";
import { apiGet, apiPost } from "./services/apiService";
import { Button } from 'react-bootstrap'

const logout = async () => {
    await apiPost('/auth/logout', null)
}

const Layout = () => {
    const [user, setUser] = useState("")
    const handleLogoutClick = async () => {
        await logout()
        document.location.reload()
    }

    useEffect(() => {
        async function getUser() {
            try {
                const user = await apiGet('/auth/whoami')
                setUser(user.data)
            } catch (error) {
                setUser(null)
            }
            return
        }
        getUser();
    }, []);

    return (
        <>
            <Navbar bg="light" expand="lg">
                {
                    (user != null) && (<Container>
                        <Navbar.Brand>Hello {user.fullName},</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/home">Home</Nav.Link>
                                <Nav.Link href="/profile">Profile</Nav.Link>
                                <Nav.Link href="/reports">Reports</Nav.Link>
                                <Nav.Link href="/companyusers">Company Users</Nav.Link>
                                <Nav.Link href="/systemusers">System Users</Nav.Link>
                                <Nav.Link href="/companyauthorization">Company - Authorization </Nav.Link>
                                <Nav.Link href="/systemauthorization">System - Authorization </Nav.Link>

                                <Button variant="secondary" onClick={handleLogoutClick}>Logout</Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>)
                }
            </Navbar>

            <Outlet />
        </>
    )
};

export default Layout;