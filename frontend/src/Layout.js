import { Outlet } from "react-router-dom";
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const Layout = () => {
    let user = "XXXX,"
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>Hello {user}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/Reports">Profile</Nav.Link>
                            <NavDropdown title="Reports" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">HTTP</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    FTP
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">SMTP</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4">SSH</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/Reports">Company Users</Nav.Link>
                            <Nav.Link href="/Reports">System Users</Nav.Link>
                            <Nav.Link href="/Reports">Company - Authorization </Nav.Link>
                            <Nav.Link href="/Reports">System - Authorization </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet />
        </>
    )
};

export default Layout;