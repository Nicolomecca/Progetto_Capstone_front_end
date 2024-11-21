import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Card, Form, Button, ProgressBar } from 'react-bootstrap';

const AssessmentQuiz = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { questions, languageName } = location.state || {};
    const token = useSelector(state => state.token.token);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    if (!questions || questions.length === 0) {
        return <Container className="mt-5"><h2 className="text-white">No questions available.</h2></Container>;
    }

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

    const handleSubmit = async () => {
        console.log("Answers submitted:", answers);
        // Implementa qui la logica per inviare le risposte al server
    };

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <Container className="mt-5">
            <h2 className="mb-4 text-white">Assessment for {languageName}</h2>
            <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="mb-4" />
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
                <Card.Footer className="d-flex justify-content-between bg-dark border-top border-secondary">
                    <Button variant="outline-light" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</Button>
                    {currentQuestionIndex < questions.length - 1 ? (
                        <Button variant="outline-light" onClick={handleNextQuestion}>Next</Button>
                    ) : (
                        <Button variant="success" onClick={handleSubmit}>Submit</Button>
                    )}
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default AssessmentQuiz;