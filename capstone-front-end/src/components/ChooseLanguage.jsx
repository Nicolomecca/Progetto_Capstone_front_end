import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Container, Row, Col, Card } from "react-bootstrap"
import { fetchLanguages } from "../actions/languageActions"

const ChooseLanguage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(state => state.token.token)
    const { languages, isLoading, error } = useSelector(state => state.languages)

    useEffect(() => {
        if (!token) {
            navigate("/login")
        } else if (!languages.length) {
            dispatch(fetchLanguages())
        }
    }, [token, navigate, languages, dispatch])

    const handleLanguageSelect = async (languageName) => {
        try {
            const response = await fetch(`http://localhost:3001/assessment/${languageName}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });

            if (response.ok) {
                const questions = await response.json();
                console.log("Quiz data:", questions);
                navigate('/assessment', { 
                    state: { 
                        questions,
                        languageName 
                    }
                });
            } else {
                throw new Error("Error loading assessment questions");
            }
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    };

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className="d-flex align-items-center" style={{ minHeight: "80vh" }}>
            <Container className="my-5">
                <h2 className="text-center mb-5">
                    <span className="title-main">Choose Your Programming</span>
                    <span className="title-accent"> Language</span>
                </h2>
                {languages && languages.length > 0 && (
                    <Row className="justify-content-center g-4 mt-3">
                        {languages.map((language) => (
                            <Col key={language.programmingLanguageId} xs={12} md={6} lg={4}>
                                <Card 
                                    className="auth-card h-100 scaleHover"
                                    onClick={() => handleLanguageSelect(language.name)}
                                    style={{ cursor: 'pointer' }}
                                >
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
        </div>
    )
}

export default ChooseLanguage