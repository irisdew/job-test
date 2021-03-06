import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
  } from 'reactstrap';

export default function MyNav(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">job-test</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
                <NavItem>
                    <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/intro">Intro</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/1/sample">Test1</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/2/sample">Test2</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="https://www.career.go.kr/">CareerNet</NavLink>
                </NavItem>
            </Nav>
            <NavbarText>{props.text}</NavbarText>
            </Collapse>
        </Navbar>
        </div>
    )
}