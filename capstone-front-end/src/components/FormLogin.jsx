import { Button, Container, Card, Form, Row, Col, Modal } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTokenAction } from '../actions';
import '../assets/style/custom-style.scss';
import { useNavigate } from 'react-router-dom';

const FormLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const checkAssessmentCompletion = async (token) => {
        try {
            const response = await fetch("http://localhost:3001/user/levels", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                const levels = await response.json();
                return Object.keys(levels).length > 0;
            }
            return false;
        } catch (error) {
            console.error("Error checking assessment completion:", error);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, password };
        
        try {
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(setTokenAction(data.token));
                localStorage.setItem('token', data.token);
                
                const assessmentCompleted = await checkAssessmentCompletion(data.token);
                
                setLoginSuccess(true);
                handleShowModal();

                setTimeout(() => {
                    handleCloseModal();
                    if (assessmentCompleted) {
                        navigate("/home");
                    } else {
                        navigate("/language");
                    }
                }, 3000);
            } else {
                const error = await response.json();
                setLoginSuccess(false);
                setErrorMessage(error.message);
                handleShowModal();
            }
        } catch (error) {
            console.log("Error:", error);
            setLoginSuccess(false);
            setErrorMessage("An error occurred. Please try again later.");
            handleShowModal();
        }
    };

    return (
        <div className="form-container position-fixed w-100 h-100 d-flex align-items-center justify-content-center">
            <Container className="p-3">
                <Row className="justify-content-center">
                    <Col xs={12} sm={10} md={8} lg={6} xl={5}>
                        <Card className="auth-card p-4 shadow">
                            <Card.Title className="mb-4 text-center">
                                <h2 className="gradient-text">Login</h2>
                            </Card.Title>
                            <Form onSubmit={handleSubmit} className="form-fade-in">
                                <Form.Group className="mb-4" controlId="formUsername" style={{"--i": 1}}>
                                    <Form.Control
                                        className="custom-input"
                                        type="text"
                                        placeholder="Enter username"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formPassword" style={{"--i": 2}}>
                                    <Form.Control
                                        className="custom-input"
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 custom-button mt-4"
                                >
                                    Login
                                </Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Body className="text-center p-5">
                    {loginSuccess && (
                        <div className="success-animation">
                            <div className="checkmark-circle">
                                <div className="checkmark draw"></div>
                            </div>
                        </div>
                    )}
                    {loginSuccess ? (
                        <>
                            <h3 className="mt-4 mb-3 home-green-text">Login Successful!</h3>
                            <p className="home-purple-text">Welcome back, {username}!</p>
                            <p className="home-purple-text">Redirecting you to your dashboard...</p>
                        </>
                    ) : (
                        <>
                            <h3 className="mt-4 mb-3 text-danger">Login Failed</h3>
                            <p className="text-dark">{errorMessage}</p>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default FormLogin;