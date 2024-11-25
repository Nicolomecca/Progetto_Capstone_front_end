import { Navbar, Container, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const MyNavbar = () => {
    const isLoggedIn = useSelector(state => state.token.token);
    const [expanded, setExpanded] = useState(false);

    return (
        <Navbar 
            expand="lg" 
            className="custom-navbar"
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
        >
            <Container>
                <Navbar.Brand className="brand-text">
                    <span className="title-main text-white fs-4 me-2">Universal</span>
                    <span className="title-accent text-white fs-4">Code</span>
                </Navbar.Brand>
                <Navbar.Toggle 
                    aria-controls="basic-navbar-nav"
                    className="navbar-toggler-custom"
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto nav-links">
                        <Nav.Link className="nav-item text-white fs-5" onClick={() => setExpanded(false)}>About Us</Nav.Link>
                        <Nav.Link className="nav-item text-white fs-5" onClick={() => setExpanded(false)}>Technologies</Nav.Link>
                        <Nav.Link as={Link} to="/theory" className="nav-item text-white fs-5" onClick={() => setExpanded(false)}>Theory</Nav.Link>
                        <Nav.Link as={Link} to="/quiz" className="nav-item text-white fs-5" onClick={() => setExpanded(false)}>Quiz</Nav.Link>
                        <Nav.Link className="nav-item text-white fs-5" onClick={() => setExpanded(false)}>Ranking</Nav.Link>
                        {isLoggedIn && (
                            <Nav.Link className="nav-item profile-link text-white fs-4" onClick={() => setExpanded(false)}>
                                My Profile
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;