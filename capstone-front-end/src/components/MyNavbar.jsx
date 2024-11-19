import { Navbar, Container, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import '../assets/style/custom-style.scss';


const MyNavbar = () => {
    const isLoggedIn = useSelector(state => state.token.token);

    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Brand className="brand-text">
                    <span className="title-main text-white ">Universal</span>
                    <span className="title-accent text-white ">Code</span>
                </Navbar.Brand>
                <Navbar.Toggle 
                    aria-controls="basic-navbar-nav"
                    className="navbar-toggler-custom"
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto nav-links">
                        <Nav.Link className="nav-item text-white ">About Us</Nav.Link>
                        <Nav.Link className="nav-item  text-white">Technologies</Nav.Link>
                        <Nav.Link className="nav-item text-white">Theory</Nav.Link>
                        <Nav.Link className="nav-item text-white">Quiz</Nav.Link>
                        <Nav.Link className="nav-item text-white ">Ranking</Nav.Link>
                        {isLoggedIn && (
                            <Nav.Link className="nav-item profile-link">
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