import React from 'react';
import { Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Timer from '../Componenti per Stile/Timer';

const QuizContent = ({ quizState, setQuizState, token, onTimeout, onNextQuestion }) => {
  const handleAnswerSelect = (questionId, answerKey) => {
    setQuizState(prev => ({
      ...prev,
      userAnswers: {
        ...prev.userAnswers,
        [questionId]: answerKey
      }
    }));
  };

  const handleNext = () => {
    onNextQuestion();
  };

  const calculateScoreDetails = () => {
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
      score: Math.round((correct / quizState.questions.length) * 100)
    };
  };

  const handleSubmitQuiz = async () => {
    const { correct, incorrect, score } = calculateScoreDetails();
    const mappedDifficulty = {
      "BEGINNER": "EASY",
      "INTERMEDIATE": "MEDIUM",
      "ADVANCED": "HARD",
      "EXPERT": "HARD"
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
          questions: quizState.questions.map(question => ({
            questionText: question.question,
            answers: question.answers,
            userAnswer: quizState.userAnswers[question.id] || "not_answered",
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
            onTimeout={onNextQuestion}
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
            <motion.div className="mt-4 d-flex justify-content-end">
              <motion.button 
                className="quiz-nav-button"
                onClick={handleNext}
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

export default QuizContent;