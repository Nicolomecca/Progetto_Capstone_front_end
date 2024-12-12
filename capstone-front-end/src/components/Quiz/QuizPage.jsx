import React, { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { fetchLanguages } from "../../actions/languageActions";
import QuizResultWithDetails from "./QuizResultWithDetails";
import LanguageGrid from "../LanguageGrid";
import QuizContent from "./QuizContent";

const QuizPage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const { languages } = useSelector((state) => state.languages);
  const [userLevels, setUserLevels] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [quizState, setQuizState] = useState({
    questions: null,
    selectedLanguage: null,
    selectedDifficulty: null,
    currentIndex: 0,
    userAnswers: {},
    completed: false,
    result: null,
  });

  useEffect(() => {
    if (!languages.length) {
      dispatch(fetchLanguages());
    }
    fetchUserLevels();
  }, [languages, dispatch]);

  const fetchUserLevels = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/levels`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setUserLevels(await response.json());
      }
    } catch (error) {
      console.error("Error fetching user levels:", error);
    } finally {
      // Ensure the spinner shows for at least 2 seconds
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  const handleTimeout = () => {
    if (quizState.currentIndex < quizState.questions.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        userAnswers: {
          ...prev.userAnswers,
          [prev.questions[prev.currentIndex].id]: null,
        },
      }));
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = async () => {
    const { correct, incorrect, score } = calculateScore();
    const mappedDifficulty = {
      BEGINNER: "EASY",
      INTERMEDIATE: "MEDIUM",
      ADVANCED: "HARD",
      EXPERT: "HARD",
    }[quizState.selectedDifficulty];

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/quiz/result`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          languageName: quizState.selectedLanguage,
          difficulty: mappedDifficulty,
          score,
          questions: formatQuestions(),
        }),
      });

      if (response.ok) {
        const resultData = await response.json();
        setQuizState((prev) => ({
          ...prev,
          completed: true,
          result: {
            ...resultData,
            correctAnswers: correct,
            incorrectAnswers: incorrect,
          },
        }));
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    let incorrect = 0;
    quizState.questions.forEach((question) => {
      const userAnswer = quizState.userAnswers[question.id];
      if (userAnswer && question.correct_answers[`${userAnswer}_correct`] === "true") {
        correct++;
      } else {
        incorrect++;
      }
    });
    return {
      correct,
      incorrect,
      score: Math.round((correct / quizState.questions.length) * 100),
    };
  };

  const formatQuestions = () => {
    return quizState.questions.map((question) => ({
      questionText: question.question,
      answers: question.answers,
      userAnswer: quizState.userAnswers[question.id] || "not_answered",
      correctAnswer: Object.keys(question.correct_answers)
        .find((key) => question.correct_answers[key] === "true")
        ?.replace("_correct", ""),
    }));
  };

  const handleNextQuestion = () => {
    if (quizState.currentIndex < quizState.questions.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        userAnswers: {
          ...prev.userAnswers,
          [prev.questions[prev.currentIndex].id]:
            prev.userAnswers[prev.questions[prev.currentIndex].id] || "not_answered",
        },
      }));
    } else {
      handleSubmitQuiz();
    }
  };

  if (isLoading) return (
    <div className="spinner-container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Spinner animation="border" variant="success" />
    </div>
  );

  return (
    <Container className="my-5">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {!quizState.completed ? (
          !quizState.questions ? (
            <LanguageGrid
              languages={languages}
              userLevels={userLevels}
              token={token}
              setQuizState={setQuizState}
            />
          ) : (
            <QuizContent
              quizState={quizState}
              setQuizState={setQuizState}
              token={token}
              onTimeout={handleTimeout}
              onSubmit={handleSubmitQuiz}
              onNextQuestion={handleNextQuestion}
            />
          )
        ) : (
          <QuizResultWithDetails
            result={quizState.result}
            correctAnswers={quizState.result.correctAnswers}
            incorrectAnswers={quizState.result.incorrectAnswers}
            totalQuestions={quizState.questions.length}
            questions={quizState.questions}
            userAnswers={quizState.userAnswers}
          />
        )}
      </motion.div>
    </Container>
  );
};

export default QuizPage;