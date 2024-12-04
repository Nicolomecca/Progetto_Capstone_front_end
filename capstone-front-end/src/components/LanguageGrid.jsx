// LanguageGrid.jsx
import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SkillLevelButtons from "./SkillLevelButtons";

const LanguageGrid = ({ languages, userLevels, token, setQuizState }) => {
  const navigate = useNavigate();

  const handleQuizSelect = async (languageName, difficulty) => {
    if (!token) {
      console.error("Token is missing");
      return;
    }

    const mappedDifficulty = {
      BEGINNER: "EASY",
      INTERMEDIATE: "MEDIUM",
      ADVANCED: "HARD",
      EXPERT: "HARD",
    }[difficulty];

    if (!mappedDifficulty) {
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
        console.log(questions)
        setQuizState({
          questions,
          selectedLanguage: languageName,
          selectedDifficulty: difficulty,
          currentIndex: 0,
          userAnswers: {},
          completed: false,
          result: null,
        });
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
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const questions = await response.json();
        navigate("/assessment", {
          state: { questions, languageName, token },
        });
      } else {
        throw new Error("Error loading assessment questions");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Row>
      <h2 className="text-center mb-5">
        <span className="title-main">Learn </span>
        <span className="title-accent"> Always</span>
      </h2>
      {languages.map((language, index) => (
        <Col key={language.programmingLanguageId} xs={12} md={6} lg={4}>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="mb-4 quiz-card glass-effect">
              <Card.Body>
                <SkillLevelButtons
                  language={language}
                  userLevels={userLevels}
                  onQuizSelect={handleQuizSelect}
                  onLanguageSelect={handleLanguageSelect}
                />
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  );
};

export default LanguageGrid;
