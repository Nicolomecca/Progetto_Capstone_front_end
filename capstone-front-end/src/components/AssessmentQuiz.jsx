import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card, Form, Button, ProgressBar } from 'react-bootstrap';
import QuizResult from './QuizResult';

const AssessmentQuiz = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { questions, languageName } = location.state || {};
    const token = useSelector(state => state.token.token);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [quizResult, setQuizResult] = useState(null);

    useEffect(() => {
        if (!questions || questions.length === 0) {
            navigate('/choose-language');
        }
    }, [questions, navigate]);

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerChange = (questionId, answerKey) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answerKey
        }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const calculateScore = () => {
        let correct = 0;
        let incorrect = 0;
        questions.forEach(question => {
            const userAnswer = answers[question.id];
            if (userAnswer && question.correct_answers[`${userAnswer}_correct`] === "true") {
                correct++;
            } else {
                incorrect++;
            }
        });
        setCorrectAnswers(correct);
        setIncorrectAnswers(incorrect);
        return Math.round((correct / questions.length) * 100);
    };

    const handleSubmit = async () => {
        const score = calculateScore();
        console.log('Calculated score:', score);
        console.log('Submitting assessment for language:', languageName);
        
        try {
            console.log('Sending request with data:', {
                programmingLanguageName: languageName,
                score: score
            });
            
            const response = await fetch('http://localhost:3001/assessment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    programmingLanguageName: languageName,
                    score: score
                })
            });
    
            console.log('Response status:', response.status);
    
            if (response.ok) {
                const result = await response.json();
                console.log('Assessment submitted successfully. Result:', result);
                setQuizResult(result);
                setQuizCompleted(true);
            } else {
                const errorText = await response.text();
                console.error('Failed to submit assessment. Server response:', errorText);
                throw new Error('Failed to submit assessment');
            }
        } catch (error) {
            console.error('Error submitting assessment:', error);
            // Gestisci l'errore (ad esempio, mostrando un messaggio all'utente)
        }
    };

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    if (!currentQuestion) {
        return <Container className="mt-5"><h2 className="text-white">Loading...</h2></Container>;
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={8} lg={6}>
                    <h2 className="mb-4 text-white text-center">Assessment for {languageName}</h2>
                    {!quizCompleted ? (
                        <>
                            <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="mb-4 progress" />
                            <Card bg="dark" text="white" className="shadow">
                                <Card.Body>
                                    <Card.Title className="text-white">Question {currentQuestionIndex + 1} of {questions.length}</Card.Title>
                                    <Card.Text className="text-white">{currentQuestion.question}</Card.Text>
                                    {currentQuestion.description && <Card.Text className="text-muted">{currentQuestion.description}</Card.Text>}
                                    <Form>
                                        {Object.entries(currentQuestion.answers).map(([key, value]) => {
                                            if (value === null) return null;
                                            return (
                                                <Form.Check
                                                    key={key}
                                                    type="radio"
                                                    id={`q${currentQuestion.id}${key}`}
                                                    name={`question${currentQuestion.id}`}
                                                    label={value}
                                                    onChange={() => handleAnswerChange(currentQuestion.id, key)}
                                                    checked={answers[currentQuestion.id] === key}
                                                    className="text-white mb-2"
                                                />
                                            );
                                        })}
                                    </Form>
                                </Card.Body>
                                <Card.Footer className="d-flex justify-content-between auth-bot">
                                    <Button className="auth-links" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</Button>
                                    {currentQuestionIndex < questions.length - 1 ? (
                                        <Button className="auth-links" onClick={handleNextQuestion}>Next</Button>
                                    ) : (
                                        <Button className="auth-links" onClick={handleSubmit}>Submit</Button>
                                    )}
                                </Card.Footer>
                            </Card>
                        </>
                    ) : (
                        <QuizResult 
                            result={quizResult}
                            correctAnswers={correctAnswers}
                            incorrectAnswers={incorrectAnswers}
                            totalQuestions={questions.length}
                        />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default AssessmentQuiz;