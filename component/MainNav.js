import React, { use, useState } from "react";
import { Container, Nav, Navbar, Form, FormControl, Button, NavbarToggle, NavbarCollapse } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from 'next/router';
import { getToken, removeToken, removeUser } from "../lib/authenticate";

const MainNav = () => {

    const router = useRouter();

    //get token
    const token = getToken();

    //logout function
    const logout = () => {
        removeToken();
        removeUser();
        router.push('/')
    }

    return (
        <Container style={{marginTop: '25px'}}>
            <Navbar className="fixed-top navbar-dark bg-primary" expand="lg">
                <Navbar.Brand style={{marginLeft: '10px'}}>Restaurant Reservation System</Navbar.Brand>
                <NavbarToggle style={{marginRight: '10px'}} aria-controls="responsive-navbar-nav" />
                <NavbarCollapse style={{marginLeft: '10px'}} id="responsive-navbar-nav">
                    <Nav>
                        <Link href='/' passHref legacyBehavior>
                            <Nav.Link active={router.pathname === "/search"}>Home</Nav.Link>
                        </Link>
                    </Nav>
                    <Nav style={{marginLeft: "auto", gap: '10px'}} className="d-flex">
                        {!token && <Link href='/login' passHref legacyBehavior>
                            <Nav.Link active={router.pathname === "/search"}>login</Nav.Link>
                        </Link>}
                    </Nav>
                    <Nav>
                        {!token && <Link href='/register' passHref legacyBehavior>
                            <Nav.Link active={router.pathname === "/search"}>register</Nav.Link>
                        </Link>}
                    </Nav>
                    <Nav>
                        {token && <Link href='/reservations' passHref legacyBehavior>
                            <Nav.Link active={router.pathname === "/reservations"}>reservations</Nav.Link>
                        </Link>}
                    </Nav>
                    <Nav>
                        {token && <Link href='/newreservation' passHref legacyBehavior>
                            <Nav.Link active={router.pathname === "/newreservation"}>new-reservation</Nav.Link>
                        </Link>}
                    </Nav>
                    {token && <Button onClick={logout}>Logout</Button>}
                </NavbarCollapse>
            </Navbar>
            <br/>
            <br/>
        </Container>
    )
}

export default MainNav;