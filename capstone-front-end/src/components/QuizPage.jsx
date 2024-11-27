import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import QuizResultWithDetails from "./QuizResultWithDetails";
import { fetchLanguages } from "../actions/languageActions";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Timer from "./Timer";

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

    // Prepara le domande e risposte
    const questions = quizQuestions.map((question) => ({
      questionText: question.question,
      answers: question.answers,
      userAnswer: userAnswers[question.id],
      correctAnswer: Object.keys(question.correct_answers)
        .find((key) => question.correct_answers[key] === "true")
        ?.replace("_correct", ""),
    }));

    try {
      const response = await fetch("http://localhost:3001/quiz/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          languageName: selectedLanguage,
          difficulty: mappedDifficulty,
          score: score,
          questions: questions,
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.2 },
    },
  };

  const questionVariants = {
    enter: { x: 1000, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -1000, opacity: 0 },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <Container className="my-5">
      <motion.h2
        className="text-center mb-5 text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="title-main">Choose a Quiz</span>
      </motion.h2>

      {!quizCompleted ? (
        !quizQuestions ? (
          <Row>
            {languages.map((language, index) => (
              <Col key={language.programmingLanguageId} xs={12} md={6} lg={4}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="mb-4 quiz-card glass-effect">
                    <Card.Body>
                      <motion.h3
                        className="text-white"
                        whileHover={{ scale: 1.1 }}
                      >
                        {language.name}
                      </motion.h3>
                      <Row className="mt-4">
                        {userLevels[language.name] !== undefined ? (
                          skillLevels.map((level, idx) => (
                            <Col key={level} xs={6} className="mb-3">
                              <motion.div
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                              >
                                <div
                                  className={ `level-button w-100 ${
                                    idx >
                                    skillLevels.indexOf(
                                      userLevels[language.name]
                                    )
                                      ? "disabled"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    idx <=
                                      skillLevels.indexOf(
                                        userLevels[language.name]
                                      ) &&
                                    handleQuizSelect(language.name, level)
                                  }
                                >
                                  {level}
                                </div>
                              </motion.div>
                            </Col>
                          ))
                        ) : (
                          <Col xs={12}>
                            <motion.div
                              variants={buttonVariants}
                              whileHover="hover"
                              whileTap="tap"
                            >
                              <div
                                className=" rounded-circle assessment-button w-100"
                                onClick={() =>
                                  handleLanguageSelect(language.name)
                                }
                              >
                                Start Assessment
                              </div>
                            </motion.div>
                          </Col>
                        )}
                      </Row>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card className="quiz-card glass-effect">
              <Card.Body>
                <h3 className="text-white mb-4">
                  {selectedLanguage} - {selectedDifficulty} Quiz
                </h3>
                <Timer
                  duration={40}
                  onTimeout={() => {
                    if (currentQuestionIndex < quizQuestions.length - 1) {
                      handleNextQuestion();
                    } else {
                      handleSubmitQuiz();
                    }
                  }}
                  currentQuestion={currentQuestionIndex}
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestionIndex}
                    variants={questionVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                  >
                    <div className="question-container">
                      <h4 className="text-white mb-4">
                        Question {currentQuestionIndex + 1} of{" "}
                        {quizQuestions.length}
                      </h4>
                      <p className="question-text">
                        {quizQuestions[currentQuestionIndex].question}
                      </p>
                      <div className="answers-container">
                        {Object.entries(
                          quizQuestions[currentQuestionIndex].answers
                        ).map(
                          ([key, value]) =>
                            value && (
                              <motion.div
                                key={key}
                                whileHover={{ scale: 1.02 }}
                                className="mb-3"
                              >
                                <div
                                  className={`answer-box ${
                                    userAnswers[
                                      quizQuestions[currentQuestionIndex].id
                                    ] === key
                                      ? "selected"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    handleAnswerSelect(
                                      quizQuestions[currentQuestionIndex].id,
                                      key
                                    )
                                  }
                                >
                                  {value}
                                </div>
                              </motion.div>
                            )
                        )}
                      </div>
                      <motion.div className="mt-4 d-flex justify-content-between">
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          className="quiz-nav-button"
                          onClick={handlePreviousQuestion}
                          disabled={currentQuestionIndex === 0}
                        >
                          Previous
                        </motion.button>
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          className="quiz-nav-button"
                          onClick={
                            currentQuestionIndex < quizQuestions.length - 1
                              ? handleNextQuestion
                              : handleSubmitQuiz
                          }
                        >
                          {currentQuestionIndex < quizQuestions.length - 1
                            ? "Next"
                            : "Submit Quiz"}
                        </motion.button>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </Card.Body>
            </Card>
          </motion.div>
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
