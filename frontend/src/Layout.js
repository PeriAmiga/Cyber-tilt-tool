import { Outlet } from "react-router-dom";
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
//import NavDropdown from "react-bootstrap/NavDropdown";

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
                            <Nav.Link href="/Reports">Reports</Nav.Link>
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