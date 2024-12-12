import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Timer from '../Componenti per Stile/Timer';
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
    } else {
      checkAssessmentCompletion();
    }
  }, [questions, navigate, languageName, token]);

  const checkAssessmentCompletion = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/assessment/user/completed/${languageName}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.completed) {
          navigate('/choose-language', { state: { message: `You have already completed the assessment for ${languageName}.` } });
        }
      } else {
        console.error('Failed to check assessment completion');
      }
    } catch (error) {
      console.error('Error checking assessment completion:', error);
    }
  };

  const handleAnswerSelect = (questionId, answerKey) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerKey }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
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
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/assessment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ programmingLanguageName: languageName, score: score })
      });
      if (response.ok) {
        const result = await response.json();
        setQuizResult(result);
        setQuizCompleted(true);
      } else {
        throw new Error('Failed to submit assessment');
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <Container className="mt-5">
        <motion.h2 
          className="text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading...
        </motion.h2>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <motion.h2 
            className="mb-4 text-white text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Assessment for {languageName}
          </motion.h2>
          {!quizCompleted ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="quiz-card glass-effect">
                <Card.Body>
                  <Timer
                    duration={40}
                    currentQuestion={currentQuestionIndex}
                    onTimeout={handleNextQuestion}
                  />
                  <div className="question-container">
                    <h4 className="text-white mb-4">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </h4>
                    <p className="question-text">
                      {questions[currentQuestionIndex].question}
                    </p>
                    <div className="answers-container">
                      {Object.entries(questions[currentQuestionIndex].answers)
                        .map(([key, value]) => 
                          value && (
                            <motion.div key={key} whileHover={{ scale: 1.02 }} className="mb-3">
                              <div 
                                className={`answer-box ${answers[questions[currentQuestionIndex].id] === key ? "selected" : ""}`}
                                onClick={() => handleAnswerSelect(questions[currentQuestionIndex].id, key)}
                              >
                                {value}
                              </div>
                            </motion.div>
                          )
                      )}
                    </div>
                    <motion.div className="mt-4 d-flex justify-content-end">
                      <motion.button 
                        className="quiz-nav-button"
                        onClick={handleNextQuestion}
                      >
                        {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit Quiz"}
                      </motion.button>
                    </motion.div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
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