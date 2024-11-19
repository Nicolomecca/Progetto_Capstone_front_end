import { useSelector } from "react-redux";
import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const FormSignUp = () => {
    const token = useSelector(state => state.token.token);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

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
                navigate("/login");
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
        <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
            <Card className="auth-card p-4 shadow mb-3" style={{ width: "500px" }}>
                <Card.Title className="mb-4 text-center">
                    <h2 className="gradient-text">Sign Up</h2>
                </Card.Title>
                <Form onSubmit={handleSubmit} className="form-fade-in">
                    {[
                        { label: "Name", value: name, setter: setName, style: {"--i": 1} },
                        { label: "Surname", value: surname, setter: setSurname, style: {"--i": 2} },
                        { label: "Username", value: userName, setter: setUserName, style: {"--i": 3} },
                        { label: "Email", value: email, setter: setEmail, type: "email", style: {"--i": 4} },
                        { label: "Password", value: password, setter: setPassword, type: "password", style: {"--i": 5} }
                    ].map((field, index) => (
                        <Form.Group className="mb-4" controlId={`form${field.label}`} key={index} style={field.style}>
                            <Form.Control
                                className="custom-input"
                                type={field.type || "text"}
                                placeholder={field.label}
                                required
                                minLength={3}
                                maxLength={30}
                                value={field.value}
                                onChange={(e) => field.setter(e.target.value)}
                            />
                        </Form.Group>
                    ))}

                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100 custom-button mt-4"
                    >
                        Sign Up
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default FormSignUp;