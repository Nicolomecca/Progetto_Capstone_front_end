// FormRegister.jsx (Login)
import { Button, Container, Card, Form,Row,Col } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SetTokenAction } from '../actions';
import '../assets/style/custom-style.scss';
import { useNavigate } from 'react-router-dom';


const FormLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


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
                const token = await response.json();
                dispatch(SetTokenAction(token.token));
                navigate("/home");


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
        </div>
    );
};


export default FormLogin;
