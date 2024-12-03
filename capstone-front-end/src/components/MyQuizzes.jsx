import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Collapse, Spinner, Button } from "react-bootstrap";
import { motion } from "framer-motion";


const MyQuizzes = () => {
  const [quizHistory, setQuizHistory] = useState({});
  const [expandedCard, setExpandedCard] = useState(null);
  const [expandedQuiz, setExpandedQuiz] = useState(null);
  const [explanations, setExplanations] = useState({});
  const [loadingExplanations, setLoadingExplanations] = useState({});
  const [renderingText, setRenderingText] = useState({});
  const token = useSelector((state) => state.token.token);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const quizzesPerPage = 3;

  useEffect(() => {
    const fetchQuizHistory = async () => {
      try {
        const response = await fetch("http://localhost:3001/user/quiz-history", {
          headers: { Authorization: `Bearer ${token}` },
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
    setExpandedQuiz(null);
    setCurrentPage(1);
  };

  const handleQuizClick = (e, quizIndex) => {
    e.stopPropagation();
    setExpandedQuiz(expandedQuiz === quizIndex ? null : quizIndex);
  };

  const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setCurrentPage((prevPage) => prevPage - 1);

  const renderLetterByLetter = (key, text) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setRenderingText(prev => ({ ...prev, [key]: text.slice(0, index) }));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
  };

  const fetchExplanation = async (e, quizIndex, questionIndex, question, userAnswer, correctAnswer) => {
    e.stopPropagation();
    const key = `${quizIndex}-${questionIndex}`;
    setLoadingExplanations(prev => ({ ...prev, [key]: true }));
    try {
      const response = await fetch("http://localhost:3001/answer/explanation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ question, userAnswer, correctAnswer })
      });
      if (response.ok) {
        const data = await response.json();
        const limitedExplanation = data.explanation.split('.')[0] + '.';
        setExplanations(prev => ({ ...prev, [key]: limitedExplanation }));
        renderLetterByLetter(key, limitedExplanation);
      } else {
        throw new Error("Failed to fetch explanation");
      }
    } catch (error) {
      console.error("Error fetching explanation:", error);
      const errorMessage = "Unable to get explanation. Please try again later.";
      setExplanations(prev => ({ ...prev, [key]: errorMessage }));
      renderLetterByLetter(key, errorMessage);
    } finally {
      setLoadingExplanations(prev => ({ ...prev, [key]: false }));
    }
  };

  if (isLoading) return (
    <div className="spinner-container">
      <Spinner animation="border" variant="success" />
    </div>
  );

  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="quiz-container">
      <Container fluid className="my-5">
        <motion.h2 className="text-center mb-5 text-white"
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
              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className={`quiz-card glass-effect h-100 ${expandedCard === language ? "expanded" : ""}`} onClick={() => handleCardClick(language)}>
                  <Card.Body className="d-flex flex-column align-items-center p-4">
                    <Card.Title className="gradient-text mb-3 fs-4">{language}</Card.Title>
                    <Card.Text className="text-white">Total Quizzes: {quizzes.length}</Card.Text>
                    <Collapse in={expandedCard === language}>
                      <div className="w-100 mt-4">
                        <Row className="g-4">
                          {quizzes.slice((currentPage - 1) * quizzesPerPage, currentPage * quizzesPerPage).map((quiz, index) => (
                            <Col key={index} xs={12} md={6} lg={4}>
                              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                                <Card className="quiz-detail-card h-100" onClick={(e) => handleQuizClick(e, index + (currentPage - 1) * quizzesPerPage)}>
                                  <Card.Body className="p-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <h5 className="text-white mb-0">Quiz {index + 1 + (currentPage - 1) * quizzesPerPage}</h5>
                                      <span className={`badge ${quiz.score >= 70 ? "bg-success" : "bg-danger"}`}>{quiz.score}%</span>
                                    </div>
                                    <hr className="my-2" />
                                    <p className="text-white mb-1"><small>Difficulty: {quiz.difficulty}</small></p>
                                    <p className="text-white mb-1"><small>Date: {new Date(quiz.date).toLocaleDateString()}</small></p>
                                    <Collapse in={expandedQuiz === index + (currentPage - 1) * quizzesPerPage}>
                                      <div className="mt-3">
                                        {quiz.questionText && quiz.questionText.map((question, qIndex) => (
                                          <div key={qIndex} className="question-box mb-3 p-3 border rounded">
                                            <p className="question-text text-white"><strong>Q{qIndex + 1}: </strong>{question.questionText}</p>
                                            <div className="answers-container ms-3">
                                              <p className={`mb-1 ${question.userAnswer === question.correctAnswer.replace("_correct", "") ? "text-success" : "text-danger"}`}>
                                                <small>Your answer: {question.answers[question.userAnswer]}</small>
                                              </p>
                                              <p className="neon-green-text mb-1">
                                                <small>Correct: {question.answers[question.correctAnswer.replace("_correct", "")]}</small>
                                              </p>
                                              {question.userAnswer !== question.correctAnswer.replace("_correct", "") && (
                                                <Button size="sm" className="mt-2 neon-green-text " variant="outline-success"
                                                  onClick={(e) => fetchExplanation(
                                                    e,
                                                    index + (currentPage - 1) * quizzesPerPage,
                                                    qIndex,
                                                    question.questionText,
                                                    question.answers[question.userAnswer],
                                                    question.answers[question.correctAnswer.replace("_correct", "")]
                                                  )}
                                                  disabled={loadingExplanations[`${index + (currentPage - 1) * quizzesPerPage}-${qIndex}`]}
                                                >
                                                  {loadingExplanations[`${index + (currentPage - 1) * quizzesPerPage}-${qIndex}`] ? <span className="loading-text neon-green-text">Loading...</span> : "Get Explanation"}
                                                </Button>
                                              )}
                                              {explanations[`${index + (currentPage - 1) * quizzesPerPage}-${qIndex}`] && (
                                                <div className="mt-2 explanation-box text-white">
                                                  <strong>Explanation:</strong> {renderingText[`${index + (currentPage - 1) * quizzesPerPage}-${qIndex}`] || ''}
                                                </div>
                                              )}
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
        {expandedCard && (
          <div className="d-flex justify-content-center align-items-center mt-4">
            <Button variant="outline-light" onClick={handlePrevPage} disabled={currentPage === 1} className="me-2">Previous</Button>
            <span className="text-white mx-2">{currentPage} of {Math.ceil(quizHistory[expandedCard].length / quizzesPerPage)}</span>
            <Button variant="outline-light" onClick={handleNextPage} disabled={currentPage * quizzesPerPage >= quizHistory[expandedCard].length} className="ms-2">Next</Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default MyQuizzes;