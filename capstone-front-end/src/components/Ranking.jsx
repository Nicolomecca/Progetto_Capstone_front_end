import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { fetchLanguages } from "../actions/languageActions";

const Ranking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token.token);
  const { languages, isLoading, error } = useSelector((state) => state.languages);
  const [rankings, setRankings] = useState({});
  const [visibleRanking, setVisibleRanking] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (!languages.length) {
      dispatch(fetchLanguages());
    }
  }, [token, navigate, languages, dispatch]);

  const handleViewRanking = async (languageName) => {
    try {
      if (visibleRanking === languageName) {
        setVisibleRanking(null);
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/ranking/${languageName}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        const rankingData = await response.json();
        setRankings({ ...rankings, [languageName]: rankingData });
        setVisibleRanking(languageName);
      } else {
        throw new Error("Error loading ranking data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="ranking-container d-flex align-items-center">
      <Container className="my-5">
        <h2 className="text-center mb-5">
          <span className="title-accent">Rankings</span>
        </h2>
        {languages && languages.length > 0 && (
          <Row className="justify-content-center g-4 mt-3">
            {languages.map((language) => (
              <Col key={language.programmingLanguageId} xs={12} md={6} lg={4}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card className="auth-card h-100">
                    <Card.Body className="d-flex flex-column align-items-center p-4">
                      <div className="language-icon mb-3">
                        <img
                          src={language.icon}
                          alt={language.name}
                          className="img-fluid"
                        />
                      </div>
                      <Card.Title className="gradient-text mb-3">
                        {language.name}
                      </Card.Title>
                      <motion.div
                        className="explore-button"
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => handleViewRanking(language.name)}
                      >
                        <span className="explore-text">
                          <span className="explore-main">
                            {visibleRanking === language.name ? "Hide" : "View"}
                          </span>{' '}
                          <span className="explore-accent">Ranking</span>
                        </span>
                      </motion.div>
                    </Card.Body>
                  </Card>
                </motion.div>
                {visibleRanking === language.name && rankings[language.name] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="mt-3 auth-card">
                      <Card.Body>
                        <Card.Title className="gradient-text mb-3">
                          Ranking for {language.name}
                        </Card.Title>
                        <ul className="ranking-list">
                          {rankings[language.name].map((user, index) => (
                            <motion.li
                              key={index}
                              className="ranking-item mb-3 p-2 rounded text-white"
                              whileHover={{ scale: 1.05 }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              <div className="d-flex align-items-center">
                                <div className="ranking-position me-3">
                                  {index < 3 ? (
                                    <span className="medal">
                                      {index === 0 && "🥇"}
                                      {index === 1 && "🥈"}
                                      {index === 2 && "🥉"}
                                    </span>
                                  ) : (
                                    <span className="fw-bold">{index + 1}</span>
                                  )}
                                </div>
                                <div>
                                  <div className="fw-bold">{user.username}</div>
                                  <div className="small">
                                    Score: <span className="text-warning">{user.totalScore}</span> - 
                                    Level: <span className="text-info">{user.level}</span>
                                  </div>
                                </div>
                              </div>
                            </motion.li>
                          ))}
                        </ul>
                      </Card.Body>
                    </Card>
                  </motion.div>
                )}
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Ranking;