import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Container from 'react-bootstrap/esm/Container';
function Navbar() {
    return (
        <Container>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/cars">Cars</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
        </Container>
    );
}

export default Navbar;