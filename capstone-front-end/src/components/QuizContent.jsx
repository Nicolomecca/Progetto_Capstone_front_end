// QuizContent.jsx
import React from 'react';
import { Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Timer from './Timer';
import QuestionDisplay from './QuestionDisplay';

const QuizContent = ({ quizState, setQuizState, token, onTimeout }) => {
  const handleAnswerSelect = (questionId, answerKey) => {
    setQuizState(prev => ({
      ...prev,
      userAnswers: {
        ...prev.userAnswers,
        [questionId]: answerKey
      }
    }));
  };

  const calculateScoreDetails = () => {
    let correct = 0;
    let incorrect = 0;
    quizState.questions.forEach((question) => {
      const userAnswer = quizState.userAnswers[question.id];
      if (userAnswer && question.correct_answers[`${userAnswer}_correct`] === "true") {
        correct++;
      } else if (userAnswer) {
        incorrect++;
      }
    });
    return {
      correct,
      incorrect,
      score: Math.round((correct / quizState.questions.length) * 100)
    };
  };

  const handleSubmitQuiz = async () => {
    const { correct, incorrect, score } = calculateScoreDetails();
    let mappedDifficulty;

    switch (quizState.selectedDifficulty) {
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
          languageName: quizState.selectedLanguage,
          difficulty: mappedDifficulty,
          score,
          questions: quizState.questions.map(question => ({
            questionText: question.question,
            answers: question.answers,
            userAnswer: quizState.userAnswers[question.id],
            correctAnswer: Object.keys(question.correct_answers)
              .find(key => question.correct_answers[key] === "true")
              ?.replace("_correct", "")
          }))
        }),
      });

      if (response.ok) {
        const resultData = await response.json();
        setQuizState(prev => ({
          ...prev,
          completed: true,
          result: {
            ...resultData,
            correctAnswers: correct,
            incorrectAnswers: incorrect
          }
        }));
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="quiz-card glass-effect">
        <Card.Body>
          <Timer 
            duration={40}
            currentQuestion={quizState.currentIndex}
            onTimeout={onTimeout}
          />
          <div className="question-container">
            <h4 className="text-white mb-4">
              Question {quizState.currentIndex + 1} of {quizState.questions.length}
            </h4>
            <p className="question-text">
              {quizState.questions[quizState.currentIndex].question}
            </p>
            <div className="answers-container">
              {Object.entries(quizState.questions[quizState.currentIndex].answers)
                .map(([key, value]) => 
                  value && (
                    <motion.div key={key} whileHover={{ scale: 1.02 }} className="mb-3">
                      <div 
                        className={`answer-box ${quizState.userAnswers[quizState.questions[quizState.currentIndex].id] === key ? "selected" : ""}`}
                        onClick={() => handleAnswerSelect(quizState.questions[quizState.currentIndex].id, key)}
                      >
                        {value}
                      </div>
                    </motion.div>
                  )
              )}
            </div>
            <motion.div className="mt-4 d-flex justify-content-between">
              <motion.button 
                className="quiz-nav-button"
                onClick={() => setQuizState(prev => ({
                  ...prev,
                  currentIndex: Math.max(0, prev.currentIndex - 1)
                }))}
                disabled={quizState.currentIndex === 0}
              >
                Previous
              </motion.button>
              <motion.button 
                className="quiz-nav-button"
                onClick={() => {
                  if (quizState.currentIndex < quizState.questions.length - 1) {
                    setQuizState(prev => ({
                      ...prev,
                      currentIndex: prev.currentIndex + 1
                    }));
                  } else {
                    handleSubmitQuiz();
                  }
                }}
              >
                {quizState.currentIndex < quizState.questions.length - 1 ? "Next" : "Submit Quiz"}
              </motion.button>
            </motion.div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};
export default QuizContent
