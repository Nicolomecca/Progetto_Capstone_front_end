import { Button, Container, Card, Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {SetTokenAction} from '../actions'
import '../assets/style/custom-style.scss'

const FormRegister = () =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

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
                alert("Login avvenuto con successo!");
                const token = await response.json();
                dispatch(SetTokenAction(token.token))
              } else {
                const error = await response.json();
                alert(error.message);
              }
            } catch (error) {
              console.log("Errore:", error);
              alert("Si è verificato un errore. Riprova più tardi.");
            }
          };
          return (
            <Container className="d-flex flex-column align-items-center justify-content-center pb-3 vh-100 ">
              <Card className="p-4 shadow cardSign mb-3 card">
                <Card.Title className="mb-4 fs-2 text-white">Login</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
        
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <div className="text-center">
        
                    <Button
                      variant="success"
                      type="submit"
                      className="btn-lg w-100 rounded-pill"
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </Card>
            </Container>
          );
        };
        
        export default FormRegister;
        


