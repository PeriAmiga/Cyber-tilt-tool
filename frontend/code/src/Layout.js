import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Button } from 'react-bootstrap';
import { apiGet, apiPost } from "./services/apiService";

const Layout = () => {
    const [user, setUser] = useState("");
    const [sessionTimeout, setSessionTimeout] = useState(null);
    const navigate = useNavigate();

    const logout = async () => {
        await apiPost('/auth/logout', null);
        navigate('/login');
        document.location.reload();
    };

    const resetSessionTimeout = () => {
        clearTimeout(sessionTimeout);
        const timeout = setTimeout(logout, 600000000000000);
        setSessionTimeout(timeout);
    };

    useEffect(() => {
        async function getUser() {
            try {
                const res = await apiGet('/auth/whoami');
                setUser(res.data);
                resetSessionTimeout();
            } catch (error) {
                setUser(null);
            }
        }

        getUser();

        const timeout = setTimeout(logout, 600000000000000);
        setSessionTimeout(timeout);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <>
            <Navbar bg="light" expand="lg">
                {user != null && (
                    <Container>
                        <Navbar.Brand>Hello {user.fullName},</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/home">Home</Nav.Link>
                                <Nav.Link href="/profile">Profile</Nav.Link>
                                <Nav.Link href="/reports">Reports</Nav.Link>
                                {user.isCompanyAdmin === true && (<Nav.Link href="/companyusers">Company Users</Nav.Link>)}
                                {user.isSysAdmin === true && (<Nav.Link href="/systemusers">System Users</Nav.Link>)}
                                {user.isCompanyAdmin === true && (
                                    <Nav.Link href="/companyauthorization">
                                        Company - Authorization
                                    </Nav.Link>
                                )}
                                {user.isSysAdmin === true && (
                                    <Nav.Link href="/systemauthorization">
                                        System - Authorization
                                    </Nav.Link>
                                )}
                                {user.isSysAdmin == true && (
                                    <Nav.Link href="/companymanagement">
                                        Company - Management
                                    </Nav.Link>
                                )}
                                <Button variant="secondary" onClick={logout}>
                                    Logout
                                </Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                )}
            </Navbar>

            <Outlet />
        </>
    );
};

export default Layout;
