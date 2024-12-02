import { useSelector } from "react-redux";
import { useState } from "react";
import { Container, Card, Form, Button, Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const FormSignUp = () => {
    const token = useSelector(state => state.token.token);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            name,
            surname,
            userName,
            email,
            password,
            totalScore: 0
        };
        
        try {
            const response = await fetch("http://localhost:3001/auth/register", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                handleShowModal();
                setTimeout(() => {
                    handleCloseModal();
                    navigate("/login");
                }, 3000);
            } else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            console.log("Error:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="form-container position-fixed w-100 h-100 d-flex align-items-center justify-content-center">
            <Container className="p-3">
                <Row className="justify-content-center">
                    <Col xs={12} sm={10} md={8} lg={6} xl={5}>
                        <Card className="auth-card p-4 shadow">
                            <Card.Title className="mb-4 text-center">
                                <h2 className="gradient-text">Sign Up</h2>
                            </Card.Title>
                            <Form onSubmit={handleSubmit} className="form-fade-in">
                                <Row>
                                    <Col xs={12} md={6}>
                                        <Form.Group className="mb-4" controlId="formName" style={{"--i": 1}}>
                                            <Form.Control
                                                className="custom-input"
                                                type="text"
                                                placeholder="Name"
                                                required
                                                minLength={3}
                                                maxLength={30}
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group className="mb-4" controlId="formSurname" style={{"--i": 2}}>
                                            <Form.Control
                                                className="custom-input"
                                                type="text"
                                                placeholder="Surname"
                                                required
                                                minLength={3}
                                                maxLength={30}
                                                value={surname}
                                                onChange={(e) => setSurname(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-4" controlId="formUsername" style={{"--i": 3}}>
                                    <Form.Control
                                        className="custom-input"
                                        type="text"
                                        placeholder="Username"
                                        required
                                        minLength={3}
                                        maxLength={30}
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formEmail" style={{"--i": 4}}>
                                    <Form.Control
                                        className="custom-input"
                                        type="email"
                                        placeholder="Email"
                                        required
                                        minLength={3}
                                        maxLength={30}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formPassword" style={{"--i": 5}}>
                                    <Form.Control
                                        className="custom-input"
                                        type="password"
                                        placeholder="Password"
                                        required
                                        minLength={3}
                                        maxLength={30}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 custom-button mt-4"
                                >
                                    Sign Up
                                </Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Body className="text-center p-5">
                    <div className="success-animation">
                        <div className="checkmark-circle">
                            <div className="checkmark draw"></div>
                        </div>
                    </div>
                    <h3 className="mt-4 mb-3 home-green-text">Registration Successful!</h3>
                    <p className="home-purple-text">Welcome aboard, {userName}!</p>
                    <p className="home-purple-text">Redirecting you to login...</p>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default FormSignUp;