import React from 'react';
import { Card, ProgressBar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const QuizResultWithDetails = ({ result, correctAnswers, incorrectAnswers, totalQuestions, questions, userAnswers }) => {
    const navigate = useNavigate();

    return (
        <>
            <Card bg="dark" text="white" className="shadow mb-4">
                <Card.Body>
                    <Card.Title className="text-center mb-4">Quiz Completed!</Card.Title>
                    <Card.Text className="text-center">
                        Congratulations! You can now start learning for real.
                    </Card.Text>
                    <Card.Text className="text-center">
                        Your Score: {result.score}%
                    </Card.Text>
                    <Card.Text className="text-center">
                        Level: {result.skillLevel}
                    </Card.Text>
                    <ProgressBar className="mb-3">
                        <ProgressBar variant="success" now={(correctAnswers / totalQuestions) * 100} key={1} />
                        <ProgressBar variant="danger" now={(incorrectAnswers / totalQuestions) * 100} key={2} />
                    </ProgressBar>
                    <div className="text-center">
                        <span className="me-3">Correct: {correctAnswers}</span>
                        <span>Incorrect: {incorrectAnswers}</span>
                    </div>

                    {/* Show detailed results */}
                    <div className="mt-4">
                        {questions.map((question, index) => (
                            <div key={index} className="mb-3">
                                <h5>{question.question}</h5>
                                {Object.entries(question.answers).map(([key, value]) => {
                                    if (value === null) return null;
                                    const isCorrect = question.correct_answers[`${key}_correct`] === "true";
                                    const userAnswer = userAnswers[question.id] === key;
                                    return (
                                        <div key={key} style={{ color: isCorrect ? 'green' : userAnswer ? 'red' : 'white' }}>
                                            {value} {userAnswer && !isCorrect ? '(Your Answer)' : ''}
                                            {isCorrect && '(Correct)'}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </Card.Body>
            </Card>
            <div className="text-center auth-bot">
                <Button className="auth-links" onClick={() => navigate('/home')}>
                    Go to Home
                </Button>
            </div>
        </>
    );
};

export default QuizResultWithDetails;