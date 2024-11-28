import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLanguages } from '../actions/languageActions';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

const ProgrammingLanguageDetails = () => {
  const dispatch = useDispatch();
  const { languages, isLoading, error } = useSelector(state => state.languages);

  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  if (isLoading) return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Loading...</motion.div>;
  if (error) return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Error: {error}</motion.div>;

  const getTheoryPreview = (theory) => {
    const parsedTheory = JSON.parse(theory);
    if (parsedTheory.length > 0 && parsedTheory[0].topics.length > 0) {
      return parsedTheory[0].topics[0].content.substring(0, 50) + '...';
    }
    return 'No preview available';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
        duration: 0.8
      }
    }
  };

  return (
    <Container className="my-5">
      <motion.h1 
        className="text-center mb-5"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 50, duration: 1 }}
      >
        <span className="title-main">Programming Languages</span>
        <motion.span 
          className="title-accent"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        > Theory</motion.span>
      </motion.h1>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Row className="g-4">
          {languages.map((language) => (
            <Col key={language.programmingLanguageId} xs={12} md={6} lg={4}>
              <motion.div variants={cardVariants}>
                <Card className="h-100 language-card">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Card.Body className="d-flex flex-column">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                      >
                        <Card.Title className="gradient-text mb-3">{language.name}</Card.Title>
                        <Card.Text className="text-white">{language.category}</Card.Text>
                        <Card.Text className="text-white">{getTheoryPreview(language.theory)}</Card.Text>
                      </motion.div>
                    </Card.Body>
                    <AnimatePresence>
                      <Link to={`/theory/${language.name}`} className="explore-link">
                        <motion.div
                          className="explore-button"
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="explore-text">
                            <span className="explore-main">Explore</span>{' '}
                            <span className="explore-accent">Theory</span>
                          </span>
                        </motion.div>
                      </Link>
                    </AnimatePresence>
                  </motion.div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>
    </Container>
  );
};

export default ProgrammingLanguageDetails;