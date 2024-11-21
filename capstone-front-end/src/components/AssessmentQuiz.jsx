// QuizStart.jsx (nuovo componente)
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Container, Card, Button } from "react-bootstrap"

const QuizStart = () => {
    const token = useSelector(state => state.token.token)
    const navigate = useNavigate()
    const { languageId } = useParams()
    const [language, setLanguage] = useState(null)

    useEffect(() => {
        if (!token) {
            navigate("/login")
            return
        }
        fetchLanguageDetails()
    }, [])

    const fetchLanguageDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3001/languages/${languageId}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            if (response.ok) {
                const data = await response.json()
                setLanguage(data)
            }
        } catch (error) {
            console.error("Error fetching language details:", error)
        }
    }

    const startQuiz = () => {
        // Implementa la logica per iniziare il quiz
        navigate(`/quiz/${languageId}/start`)
    }

    return (
        <div className="quiz-start-page">
            <Container className="mt-5">
                {language && (
                    <Card className="quiz-card">
                        <Card.Body className="text-center">
                            <div className="language-icon-large mb-4">
                                <img 
                                    src={language.icon} 
                                    alt={language.name}
                                    className="img-fluid"
                                />
                            </div>
                            <Card.Title className="quiz-title mb-4">
                                Test Your {language.name} Knowledge
                            </Card.Title>
                            <Card.Text className="quiz-description mb-4">
                                Take this quiz to assess your {language.name} programming skills
                                and determine your proficiency level.
                            </Card.Text>
                            <Button 
                                className="start-quiz-btn"
                                onClick={startQuiz}
                            >
                                Start Quiz
                            </Button>
                        </Card.Body>
                    </Card>
                )}
            </Container>
        </div>
    )
}

export default QuizStart