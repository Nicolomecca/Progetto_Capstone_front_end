import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeTokenAction } from "../actions/index"; // Assicurati che il percorso sia corretto

const MyNavbar = () => {
  const isLoggedIn = useSelector((state) => state.token.token);
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(removeTokenAction());
    navigate("/welcome");
  };

  return (
    <Navbar
      expand="lg"
      className="custom-navbar"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/home" className="brand-text">
          <span className="title-main text-white fs-4 me-2">Universal</span>
          <span className=" fs-4 title-accents">Code</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="navbar-toggler-custom"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav-links">
            <Nav.Link
              as={Link}
              to="/home"
              className="nav-item text-white fs-5"
              onClick={() => setExpanded(false)}
            >
              About Us
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/technologies"
              className="nav-item text-white fs-5"
              onClick={() => setExpanded(false)}
            >
              Technologies
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/theory"
              className="nav-item text-white fs-5"
              onClick={() => setExpanded(false)}
            >
              Theory
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/quiz"
              className="nav-item text-white fs-5"
              onClick={() => setExpanded(false)}
            >
              Quiz
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/practice"
              className="nav-item text-white fs-5"
              onClick={() => setExpanded(false)}
            >
              Practice
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/ranking"
              className="nav-item text-white fs-5"
              onClick={() => setExpanded(false)}
            >
              Ranking
            </Nav.Link>
            {isLoggedIn && (
              <NavDropdown
                title={<span className="text-white fs-4">My Profile</span>}
                id="basic-nav-dropdown"
                className="nav-item profile-link custom-dropdown profile-dropdown"
              >
                <NavDropdown.Item
                  as={Link}
                  to="/profile"
                  className="custom-dropdown-item"
                >
                  View Profile
                </NavDropdown.Item>

                <NavDropdown.Item
                  as={Link}
                  to="/quiz-history"
                  className="custom-dropdown-item"
                >
                  My Quizzes
                </NavDropdown.Item>
                <NavDropdown.Divider className="custom-dropdown-divider" />
                <NavDropdown.Item
                  onClick={handleLogout}
                  className="custom-dropdown-item"
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
