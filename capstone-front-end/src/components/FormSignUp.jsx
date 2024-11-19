import { useSelector } from "react-redux"
import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'


const FormSignUp = () => {
    const token = useSelector(state => state.token.token)
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [userName, setUserName] = useState("");  // Cambiato da username a userName
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            name,
            surname,
            userName,  // Cambiato da username a userName
            email,
            password,
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
                alert("Registration successful");
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
        <Container className="d-flex flex-column align-items-center justify-content-center pb-3 mt-5 vh-100">
            <Card className="p-4 shadow cardSign mb-3">
                <Card.Title className="mb-4 fs-2 text-white">Sign-up</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            required
                            minLength={3}  // Cambiato per matchare il DTO
                            maxLength={30}  // Cambiato per matchare il DTO
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formSurname">
                        <Form.Control
                            type="text"
                            placeholder="Surname"
                            required
                            minLength={3}  // Cambiato per matchare il DTO
                            maxLength={30}  // Cambiato per matchare il DTO
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            required
                            minLength={3}  // Cambiato per matchare il DTO
                            maxLength={30}  // Cambiato per matchare il DTO
                            value={userName}  // Cambiato da username a userName
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                            pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$"
                            title="Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <div className="text-center">
                        <Button
                            variant="success"
                            type="submit"
                            className="btn-lg w-100 rounded-pill"
                        >
                            Sign-up
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
}

export default FormSignUp;