import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import QuizResultWithDetails from "./QuizResultWithDetails";
import { fetchLanguages } from "../actions/languageActions";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const { languages } = useSelector((state) => state.languages);
  const [userLevels, setUserLevels] = useState({});
  const [quizQuestions, setQuizQuestions] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!languages.length) {
      dispatch(fetchLanguages());
    }
    fetchUserLevels();
  }, [languages, dispatch]);

  const fetchUserLevels = async () => {
    if (!token) {
      console.error("Token is missing");
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/user/levels", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const levels = await response.json();
        setUserLevels(levels);
      } else {
        console.error("Failed to fetch user levels");
      }
    } catch (error) {
      console.error("Error fetching user levels:", error);
    }
  };

  const handleQuizSelect = async (languageName, difficulty) => {
    if (!token) {
      console.error("Token is missing");
      return;
    }
    setSelectedLanguage(languageName);
    setSelectedDifficulty(difficulty);
    let mappedDifficulty;
    switch (difficulty) {
      case "BEGINNER":
        mappedDifficulty = "EASY";
        break;
      case "INTERMEDIATE":
        mappedDifficulty = "MEDIUM";
        break;
      case "ADVANCED":
      case "EXPERT":
        mappedDifficulty = "HARD";
        break;
      default:
        console.error("Invalid difficulty level");
        return;
    }
    try {
      const response = await fetch(
        `http://localhost:3001/quiz/questions/${languageName}/${mappedDifficulty}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.ok) {
        const questions = await response.json();
        console.log(questions);
        setQuizQuestions(questions);
        setCurrentQuestionIndex(0);
        setUserAnswers({});
      } else {
        console.error("Error loading quiz questions");
      }
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
    }
  };

  const handleLanguageSelect = async (languageName) => {
    try {
      const response = await fetch(
        `http://localhost:3001/assessment/${languageName}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      if (response.ok) {
        const questions = await response.json();
        navigate("/assessment", { state: { questions, languageName, token } });
      } else {
        throw new Error("Error loading assessment questions");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  const handleAnswerSelect = (questionId, answerKey) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answerKey }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScoreDetails = () => {
    let correct = 0;
    let incorrect = 0;
    quizQuestions.forEach((question) => {
      const userAnswer = userAnswers[question.id];
      if (
        userAnswer &&
        question.correct_answers[`${userAnswer}_correct`] === "true"
      ) {
        correct++;
      } else if (userAnswer) {
        incorrect++;
      }
    });
    return {
      correct,
      incorrect,
      score: Math.round((correct / quizQuestions.length) * 100),
    };
  };

  const handleSubmitQuiz = async () => {
    const { correct, incorrect, score } = calculateScoreDetails();
    let mappedDifficulty;
    switch (selectedDifficulty) {
      case "BEGINNER":
        mappedDifficulty = "EASY";
        break;
      case "INTERMEDIATE":
        mappedDifficulty = "MEDIUM";
        break;
      case "ADVANCED":
      case "EXPERT":
        mappedDifficulty = "HARD";
        break;
      default:
        console.error("Invalid difficulty level");
        return;
    }
    try {
      const response = await fetch("http://localhost:3001/quiz/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          programmingLanguageName: selectedLanguage,
          difficulty: mappedDifficulty,
          score: score,
        }),
      });
      if (response.ok) {
        const resultData = await response.json();
        setQuizResult({
          ...resultData,
          correctAnswers: correct,
          incorrectAnswers: incorrect,
        });
        setQuizCompleted(true);
      } else {
        console.error("Failed to submit quiz results");
      }
    } catch (error) {
      console.error("Error submitting quiz results:", error);
    }
  };

  const skillLevels = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"];

  return (
    <Container className="my-5">
      <h2 className="text-center mb-5">
        <span className="animated-dots">... </span>
        <span className="title-main">Choose a Quiz </span>
        <span className="animated-dots">...</span>
      </h2>
      {!quizCompleted ? (
        !quizQuestions ? (
          languages.map((language) => (
            <Card
              key={language.programmingLanguageId}
              className="mb-4 auth-card text-white quiz-card"
            >
              <Card.Body>
                <Card.Title className="gradient-text">
                  {language.name}
                </Card.Title>
                <Row className="mt-3 reveal-on-hover">
                  {userLevels[language.name] !== undefined ? (
                    skillLevels.map((level, index) => (
                      <Col key={level} xs={6} md={3}>
                       <div className="auth-bot">
                        <Button
                          className="w-100 mb-2 auth-links"
                          onClick={() => handleQuizSelect(language.name, level)}
                          disabled={
                            index >
                            skillLevels.indexOf(userLevels[language.name])
                          }
                        >
                          {level}
                        </Button>
                        </div> 
                      </Col>
                    ))
                  ) : (
                    <Col xs={12}>
                      <Button
                        variant="success"
                        className="w-100 mb-2"
                        onClick={() => handleLanguageSelect(language.name)}
                      >
                        Start Assessment
                      </Button>
                    </Col>
                  )}
                </Row>
              </Card.Body>
            </Card>
          ))
        ) : (
          <Card className="quiz-card text-white">
            <Card.Body>
              <h3>
                {selectedLanguage} - {selectedDifficulty} Quiz
              </h3>
              {quizQuestions.length > 0 && (
                <div className="reveal-on-hover">
                  <p>
                    Question {currentQuestionIndex + 1} of{" "}
                    {quizQuestions.length}
                  </p>
                  <p>{quizQuestions[currentQuestionIndex].question}</p>
                  <Form>
                    {Object.entries(
                      quizQuestions[currentQuestionIndex].answers
                    ).map(
                      ([key, value]) =>
                        value && (
                          <Form.Check
                            key={key}
                            type="radio"
                            id={`answer-${key}`}
                            label={value}
                            name="quizAnswer"
                            onChange={() =>
                              handleAnswerSelect(
                                quizQuestions[currentQuestionIndex].id,
                                key
                              )
                            }
                            checked={
                              userAnswers[
                                quizQuestions[currentQuestionIndex].id
                              ] === key
                            }
                          />
                        )
                    )}
                  </Form>
                  <div className="mt-3">
                    <Button
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      Previous
                    </Button>
                    {currentQuestionIndex < quizQuestions.length - 1 ? (
                      <Button onClick={handleNextQuestion} className="ml-2">
                        Next
                      </Button>
                    ) : (
                      <Button onClick={handleSubmitQuiz} className="ml-2">
                        Submit Quiz
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        )
      ) : (
        <QuizResultWithDetails
          result={quizResult}
          correctAnswers={quizResult.correctAnswers}
          incorrectAnswers={quizResult.incorrectAnswers}
          totalQuestions={quizQuestions.length}
          questions={quizQuestions}
          userAnswers={userAnswers}
        />
      )}
    </Container>
  );
};

export default QuizPage;
