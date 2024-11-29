import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from 'framer-motion';

const UserProfile = () => {
    const navigate = useNavigate();
    const token = useSelector(state => state.token.token);
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch('http://localhost:3001/user/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                } else {
                    throw new Error("Failed to fetch user profile");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, [token, navigate]);

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!profileData) return null;

    return (
        <div className="d-flex align-items-center" style={{ minHeight: "80vh" }}>
            <Container className="my-5">
                <motion.div variants={cardVariants} initial="hidden" animate="visible">
                    <Card className="mb-4 profile-card glass-effect">
                        <Card.Body>
                            <Card.Title>{profileData.name} {profileData.surname}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{profileData.userName}</Card.Subtitle>
                            <Card.Text>Email: {profileData.email}</Card.Text>
                            <Card.Text>Total Score: {profileData.totalScore}</Card.Text>
                            
                            <h5>Language Progress</h5>
                            <Row>
                                {Object.entries(profileData.languageProgresses).map(([language, level]) => (
                                    <Col key={language} xs={12} md={6} lg={4}>
                                        <Card className="mb-2">
                                            <Card.Body>
                                                <Card.Title>{language}</Card.Title>
                                                <Card.Text>Level: {level}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Card.Body>
                    </Card>
                </motion.div>
            </Container>
        </div>
    );
};

export default UserProfile;