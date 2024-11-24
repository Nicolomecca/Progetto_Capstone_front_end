import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLanguages } from '../actions/languageActions';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ProgrammingLanguageDetails = () => {
  const dispatch = useDispatch();
  const { languages, isLoading, error } = useSelector(state => state.languages);

  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const getTheoryPreview = (theory) => {
    const parsedTheory = JSON.parse(theory);
    if (parsedTheory.length > 0 && parsedTheory[0].topics.length > 0) {
      return parsedTheory[0].topics[0].content.substring(0, 100) + '...';
    }
    return 'No preview available';
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">
        <span className="title-main">Programming Languages</span>
        <span className="title-accent"> Theory</span>
      </h1>
      <Row className="g-4">
        {languages.map((language) => (
          <Col key={language.programmingLanguageId} xs={12} md={6} lg={4}>
            <Card className="h-100 scaleHover">
              <Card.Body>
                <Card.Title className="gradient-text mb-3">{language.name}</Card.Title>
                <Card.Text className="text-white">{language.category}</Card.Text>
                <Card.Text className="text-white">{getTheoryPreview(language.theory)}</Card.Text>
                <Link className="auth-bot" to={`/theory/${language.name}`}>
                  <Button className="auth-links">View Full Theory</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProgrammingLanguageDetails;