import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Collapse, Spinner } from "react-bootstrap";
import { motion } from "framer-motion"; // Aggiungiamo animazioni fluide

const MyQuizzes = () => {
  const [quizHistory, setQuizHistory] = useState({});
  const [expandedCard, setExpandedCard] = useState(null);
  const [expandedQuiz, setExpandedQuiz] = useState(null);
  const token = useSelector((state) => state.token.token);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizHistory = async () => {
      try {
        const response = await fetch("http://localhost:3001/user/quiz-history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTimeout(() => {
            setQuizHistory(data);
            setIsLoading(false);
          }, 2000);
        } else {
          throw new Error("Failed to fetch quiz history");
        }
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchQuizHistory();
  }, [token]);

  const handleCardClick = (language) => {
    setExpandedCard(expandedCard === language ? null : language);
    setExpandedQuiz(null); // Reset expanded quiz when changing language
  };

  const handleQuizClick = (quizIndex) => {
    setExpandedQuiz(expandedQuiz === quizIndex ? null : quizIndex);
  };

  if (isLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="success" />
      </div>
    );
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="quiz-container d-flex align-items-center">
      <Container fluid className="my-5">
        <motion.h2 
          className="text-center mb-5 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="title-main">My Quiz</span>
          <span className="title-accent"> History</span>
        </motion.h2>

        <Row className="justify-content-center g-4">
          {Object.entries(quizHistory).map(([language, quizzes]) => (
            <Col key={language} xs={12} md={expandedCard === language ? 12 : 6} lg={expandedCard === language ? 12 : 4}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card 
                  className={`quiz-card h-100 ${expandedCard === language ? 'expanded' : ''}`}
                  onClick={() => handleCardClick(language)}
                >
                  <Card.Body className="d-flex flex-column align-items-center p-4">
                    <Card.Title className="gradient-text mb-3 fs-4">
                      {language}
                    </Card.Title>
                    <Card.Text className="text-white">
                      Total Quizzes: {quizzes.length}
                    </Card.Text>

                    <Collapse in={expandedCard === language}>
                      <div className="w-100 mt-4">
                        <Row className="g-4">
                          {quizzes.map((quiz, index) => (
                            <Col key={index} xs={12} md={6} lg={4}>
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                              >
                                <Card 
                                  className="quiz-detail-card h-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuizClick(index);
                                  }}
                                >
                                  <Card.Body className="p-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <h5 className="text-white mb-0">Quiz {index + 1}</h5>
                                      <span className={`badge ${quiz.score >= 70 ? 'bg-success' : 'bg-danger'}`}>
                                        {quiz.score}%
                                      </span>
                                    </div>
                                    <hr className="my-2" />
                                    <p className="text-white mb-1">
                                      <small>Difficulty: {quiz.difficulty}</small>
                                    </p>
                                    <p className="text-white mb-1">
                                      <small>Date: {new Date(quiz.date).toLocaleDateString()}</small>
                                    </p>

                                    <Collapse in={expandedQuiz === index}>
                                      <div className="mt-3">
                                        {quiz.questionText && quiz.questionText.map((question, qIndex) => (
                                          <div key={qIndex} className="question-box mb-3 p-3 border rounded">
                                            <p className="question-text text-white">
                                              <strong>Q{qIndex + 1}:</strong> {question.questionText}
                                            </p>
                                            <div className="answers-container ms-3">
                                              <p className={`mb-1 ${
                                                question.userAnswer === question.correctAnswer.replace("_correct", "")
                                                  ? "text-success"
                                                  : "text-danger"
                                              }`}>
                                                <small>
                                                  Your answer: {question.answers[question.userAnswer]}
                                                </small>
                                              </p>
                                              <p className="text-success mb-1">
                                                <small>
                                                  Correct: {question.answers[question.correctAnswer.replace("_correct", "")]}
                                                </small>
                                              </p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </Collapse>
                                  </Card.Body>
                                </Card>
                              </motion.div>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    </Collapse>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default MyQuizzes;