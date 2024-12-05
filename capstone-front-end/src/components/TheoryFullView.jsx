import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TheoryComponent from './TheoryComponent';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';

const TheoryFullView = () => {
  const { languageName } = useParams();
  const language = useSelector(state => 
    state.languages.languages.find(lang => lang.name === languageName)
  );

  if (!language) return <div> not found</div>;

  return (
    <Container className="my-5">
      <motion.h1 
        className="text-center mb-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="title-main">{language.name}</span>
        <span className="title-accent"> Theory</span>
      </motion.h1>
      <TheoryComponent programmingLanguage={language} />
    </Container>
  );
};

export default TheoryFullView;