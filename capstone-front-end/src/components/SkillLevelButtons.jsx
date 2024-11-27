import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

const SkillLevelButtons = ({ language, userLevels, onQuizSelect, onLanguageSelect }) => {
  const skillLevels = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"];
  
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <>
      <motion.h3 className="text-white" whileHover={{ scale: 1.1 }}>
        {language.name}
      </motion.h3>
      <Row className="mt-4">
        {userLevels[language.name] !== undefined ? (
          skillLevels.map((level, idx) => (
            <Col key={level} xs={6} className="mb-3">
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <div 
                  className={`level-button w-100 ${idx > skillLevels.indexOf(userLevels[language.name]) ? "disabled" : ""}`}
                  onClick={() => idx <= skillLevels.indexOf(userLevels[language.name]) && onQuizSelect(language.name, level)}
                >
                  {level}
                </div>
              </motion.div>
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <div 
                className="rounded-circle assessment-button w-100"
                onClick={() => onLanguageSelect(language.name)}
              >
                Start Assessment
              </div>
            </motion.div>
          </Col>
        )}
      </Row>
    </>
  );
};

export default SkillLevelButtons;