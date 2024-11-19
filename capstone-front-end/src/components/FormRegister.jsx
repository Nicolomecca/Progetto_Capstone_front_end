import { Button, Container, Card, Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {SetTokenAction} from '../actions'

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
            <Container className="d-flex flex-column align-items-center justify-content-center pb-3 vh-100">
              <Card className="p-4 shadow cardSign mb-3">
                <Card.Title className="mb-4 fs-2">Accedi</Card.Title>
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
                      variant="primary"
                      type="submit"
                      className="btn-lg w-100 rounded-pill"
                    >
                      Accedi
                    </Button>
                    <div className="d-flex align-items-center">
                      <hr className="flex-grow-1" />
                      <span className="mx-3 text-secondary">oppure</span>
                      <hr className="flex-grow-1" />
                    </div>
                  </div>
        
                  <Button
                    variant="light"
                    type="submit"
                    className="btn-lg w-100 rounded-pill border-3 border bg-white mb-2 "
                  >
                    <img
                      className="me-2 mb-1"
                      src=" https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                      width={25} alt=""
                    ></img>
                    Continue with Google
                  </Button>
        
                  <Button
                    variant="light"
                    type="submit"
                    className="btn-lg w-100 rounded-pill border-3 border  bg-white  mb-2  "
                  >
                    <img
                      className="me-2 mb-1"
                      src="https://cdn.discordapp.com/attachments/1257281696189907015/1283736614329253952/image.png?ex=66e41463&is=66e2c2e3&hm=b33139f2a1f5d627864fcafc65f0012c65876462a62e960ee7a907fee5f8a857&"
                      width={25} alt=""
                    ></img>
                    Accedi con Microsoft
                  </Button>
                  <Button
                    variant="light"
                    type="submit"
                    className="btn-lg w-100 rounded-pill border-3 border  bg-white  mb-2 "
                  >
                    <img
                      className="me-2 mb-1"
                      src=" https://img.icons8.com/?size=100&id=30840&format=png&color=000000"
                      width={25} alt=""
                    ></img>
                    Accedi con Apple
                  </Button>
                </Form>
              </Card>
            </Container>
          );
        };
        
        export default FormRegister;
        


