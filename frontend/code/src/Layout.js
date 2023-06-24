import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Button } from 'react-bootstrap';
import { apiGet, apiPost } from "./services/apiService";
import logo from './banner.png';

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
                {user ? (
                    <Container>
                        <Navbar.Brand>
                            <Nav.Item>
                                <Nav.Link href="/home"><img src={logo} width="160px" alt="Logo" /></Nav.Link>
                                <label>Hello ,{user.fullName}</label>
                            </Nav.Item>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse>
                            <Nav className="me-auto" fill variant="tabs" defaultActiveKey="tab-home">
                                <Nav.Item>
                                    <LinkContainer to="/home">
                                        <Nav.Link eventKey="tab-home">Home</Nav.Link>
                                    </LinkContainer>
                                </Nav.Item>
                                <Nav.Item>
                                    <LinkContainer to="/profile">
                                        <Nav.Link eventKey="tab-profile">Profile</Nav.Link>
                                    </LinkContainer>
                                </Nav.Item>
                                <Nav.Item>
                                    <LinkContainer to="/reports">
                                        <Nav.Link eventKey="tab-reports">Reports</Nav.Link>
                                    </LinkContainer>
                                </Nav.Item>
                                {user.isCompanyAdmin && (
                                    <Nav.Item>
                                        <LinkContainer to="/companyusers">
                                            <Nav.Link eventKey="tab-companyusers">Company Users</Nav.Link>
                                        </LinkContainer>
                                    </Nav.Item>
                                )}
                                {user.isSysAdmin && (
                                    <Nav.Item>
                                        <LinkContainer to="/systemusers">
                                            <Nav.Link eventKey="tab-systemusers">System Users</Nav.Link>
                                        </LinkContainer>
                                    </Nav.Item>
                                )}
                                {user.isCompanyAdmin && (
                                    <Nav.Item>
                                        <LinkContainer to="/companyauthorization">
                                            <Nav.Link eventKey="tab-companyauthorization">Company - Authorization</Nav.Link>
                                        </LinkContainer>
                                    </Nav.Item>
                                )}
                                {user.isSysAdmin && (
                                    <Nav.Item>
                                        <LinkContainer to="/systemauthorization">
                                            <Nav.Link eventKey="tab-systemauthorization">System - Authorization</Nav.Link>
                                        </LinkContainer>
                                    </Nav.Item>

                                )}
                                {user.isSysAdmin && (
                                    <Nav.Item>
                                        <LinkContainer to="/companymanagement">
                                            <Nav.Link eventKey="tab-companymanagement">Company - Management</Nav.Link>
                                        </LinkContainer>
                                    </Nav.Item>
                                )}
                                <Nav.Item>
                                    <Nav.Link className="link-danger" onClick={logout}>Logout</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                ) : (<Container>
                    <Navbar.Brand>
                        <img src={logo} width="160px" alt="Logo" />
                    </Navbar.Brand>
                </Container>)}
            </Navbar>

            <Outlet />
        </>
    );
};

export default Layout;
