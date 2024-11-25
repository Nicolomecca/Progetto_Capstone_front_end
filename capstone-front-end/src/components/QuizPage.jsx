import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { fetchLanguages } from '../actions/languageActions';

const QuizPage = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token.token);
    const { languages } = useSelector(state => state.languages);
    const [userLevels, setUserLevels] = useState({});
    const [quizQuestions, setQuizQuestions] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});

    useEffect(() => {
        if (!languages.length) {
            console.log('Fetching languages...');
            dispatch(fetchLanguages());
        }
        fetchUserLevels();
    }, [languages, dispatch]);

    const fetchUserLevels = async () => {
        if (!token) {
            console.error('Token is missing');
            return;
        }
        try {
            console.log('Fetching user levels...');
            const response = await fetch('http://localhost:3001/user/levels', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const levels = await response.json();
                console.log('User levels retrieved:', levels);
                setUserLevels(levels);
            } else {
                console.error('Failed to fetch user levels');
            }
        } catch (error) {
            console.error('Error fetching user levels:', error);
        }
    };

    const handleQuizSelect = async (languageName, difficulty) => {
        if (!token) {
            console.error('Token is missing');
            return;
        }
        setSelectedLanguage(languageName);
        setSelectedDifficulty(difficulty);

        let mappedDifficulty;
        switch (difficulty) {
            case 'BEGINNER':
                mappedDifficulty = 'EASY';
                break;
            case 'INTERMEDIATE':
                mappedDifficulty = 'MEDIUM';
                break;
            case 'ADVANCED':
            case 'EXPERT':
                mappedDifficulty = 'HARD';
                break;
            default:
                console.error('Invalid difficulty level');
                return;
        }

        try {
            console.log(`Fetching quiz questions for ${languageName} at ${mappedDifficulty} difficulty...`);
            const response = await fetch(`http://localhost:3001/quiz/questions/${languageName}/${mappedDifficulty}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const questions = await response.json();
                console.log('Quiz questions retrieved:', questions);
                setQuizQuestions(questions);
                setCurrentQuestionIndex(0);
                setUserAnswers({});
            } else {
                console.error('Error loading quiz questions');
            }
        } catch (error) {
            console.error('Error fetching quiz questions:', error);
        }
    };

    const handleAnswerSelect = (questionId, answerKey) => {
        console.log(`Answer selected for question ${questionId}: ${answerKey}`);
        setUserAnswers(prev => ({
            ...prev,
            [questionId]: answerKey
        }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            console.log(`Moving to question ${currentQuestionIndex + 2}`);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            console.log(`Moving back to question ${currentQuestionIndex}`);
        }
    };

    const handleSubmitQuiz = async () => {
        console.log('Submitting quiz answers:', userAnswers);
        // Implement logic to submit answers to the backend
    };

    return (
        <Container className="my-5">
            <h2 className="text-center mb-5">
                <span className="title-main">Choose a Quiz</span>
            </h2>
            {!quizQuestions ? (
                languages.map((language) => (
                    <Card key={language.programmingLanguageId} className="mb-4 auth-card text-white">
                        <Card.Body>
                            <Card.Title className="gradient-text">{language.name}</Card.Title>
                            <Row className="mt-3">
                                {['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'].map((level, index) => (
                                    <Col key={level} xs={6} md={3}>
                                        <Button
                                            variant="primary"
                                            className="w-100 mb-2"
                                            onClick={() => handleQuizSelect(language.name, level)}
                                            disabled={index > (userLevels[language.name] || -1)}
                                        >
                                            {level}
                                        </Button>
                                    </Col>
                                ))}
                            </Row>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <Card className="auth-card text-white">
                    <Card.Body>
                        <h3>{selectedLanguage} - {selectedDifficulty} Quiz</h3>
                        {quizQuestions.length > 0 && (
                            <div>
                                <p>Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
                                <p>{quizQuestions[currentQuestionIndex].question}</p>
                                <Form>
                                    {Object.entries(quizQuestions[currentQuestionIndex].answers).map(([key, value]) => (
                                        value && (
                                            <Form.Check
                                                key={key}
                                                type="radio"
                                                id={`answer-${key}`}
                                                label={value}
                                                name="quizAnswer"
                                                onChange={() => handleAnswerSelect(quizQuestions[currentQuestionIndex].id, key)}
                                                checked={userAnswers[quizQuestions[currentQuestionIndex].id] === key}
                                            />
                                        )
                                    ))}
                                </Form>
                                <div className="mt-3">
                                    <Button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</Button>
                                    {currentQuestionIndex < quizQuestions.length - 1 ? (
                                        <Button onClick={handleNextQuestion} className="ml-2">Next</Button>
                                    ) : (
                                        <Button onClick={handleSubmitQuiz} className="ml-2">Submit Quiz</Button>
                                    )}
                                </div>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default QuizPage;