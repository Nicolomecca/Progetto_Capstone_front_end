import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Container, Row, Col, Card } from "react-bootstrap"


const ChooseLanguage = () => {
    const token = useSelector(state => state.token.token)
    const navigate = useNavigate()
    const [languages, setLanguages] = useState(null)

    const retrieveLanguages = async () => {
        try {
            const response = await fetch("http://localhost:3001/languages", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            if (response.ok) {
                const languagesFromDb = await response.json();
                console.log(languagesFromDb)
                setLanguages(languagesFromDb)
            } else {
                alert("Error loading languages");
            }
        } catch (error) {
            console.log("Error:", error);
            alert("An error occurred. Please try again later.");
        }
    }

    useEffect(() => {
        if (!token) {
            navigate("/login")
        } else {
            retrieveLanguages()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Container className="mt-5">
            <h2 className="text-center mb-5">
                <span className="title-main">Choose Your Programming</span>
                <span className="title-accent"> Language</span>
            </h2>
                {languages && (
                    <Row className="justify-content-center g-4">
                        {languages.map((language) => (
                            <Col key={language.id} xs={12} md={6} lg={4}>
                                <Card className="auth-card h-100 scaleHover">
                                    <Card.Body className="d-flex flex-column align-items-center p-4">
                                        <div className="language-icon mb-3">
                                            <img 
                                                src={language.icon} 
                                                alt={language.name} 
                                                className="img-fluid"
                                                style={{ width: "64px", height: "64px" }}
                                            />
                                        </div>
                                        <Card.Title className="gradient-text mb-3">
                                            {language.name}
                                        </Card.Title>
                                        <Card.Text className="text-white text-center underTitle">
                                            {language.category}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </>
    )
}

export default ChooseLanguage