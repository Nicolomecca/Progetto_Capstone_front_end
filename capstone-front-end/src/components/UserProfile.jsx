import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaCamera, FaCode, FaTrophy, FaEnvelope, FaStar, FaEdit } from "react-icons/fa";
import EditProfileModal from "./Componenti per Stile/EditProfileModal";

const UserProfile = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token.token);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, [token, navigate]);

  const fetchUserProfile = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/user/profile", {
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

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("picture", file);
    try {
      const response = await fetch("http://localhost:3001/user/upload-image", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (response.ok) {
        await fetchUserProfile();
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handleSaveProfile = async (updatedData) => {
    try {
      const response = await fetch("http://localhost:3001/user/upDate-profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        await fetchUserProfile();
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const getLevelStars = (level) => {
    const levelMap = { BEGINNER: 1, INTERMEDIATE: 2, ADVANCED: 3, EXPERT: 4 };
    return levelMap[level] || 0;
  };

  if (isLoading) return <div className="loading-spinner">Caricamento...</div>;
  if (error) return <div className="error-message">Errore: {error}</div>;
  if (!profileData) return null;

 
  return (
    <div className="user-profile-container">
      <Container className="py-5">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="profile-card glass-effect">
            <Card.Body className="p-4">
              <Row>
                <Col md={5} className="text-center mb-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Image src={profileData.profileImage || "https://via.placeholder.com/150"} roundedCircle className="mb-3 profile-image" />
                  </motion.div>
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} style={{ display: "none" }} accept="image/*" />
                  <Button variant="custom" size="sm" onClick={() => fileInputRef.current.click()} className="mt-2 change-photo-btn">
                    <FaCamera className="me-2" /> Cambia Foto
                  </Button>
                  <h3 className="text-white mt-3">{profileData.name} {profileData.surname}</h3>
                  <h5 className="neon-green-text">@{profileData.userName}</h5>
                </Col>
                <Col md={7}>
                  <div className="d-flex align-items-center mb-3">
                    <FaEnvelope className="text-white me-2" />
                    <span className="text-white">{profileData.email}</span>
                  </div>
                  <div className="d-flex align-items-center mb-4">
                    <FaTrophy className="text-warning me-2" />
                    <span className="text-white">Punteggio Totale: {profileData.totalScore}</span>
                  </div>
                  <h5 className="text-white mt-4">
                    <FaCode className="me-2 neon-green-text" /> Progressi Linguaggi
                  </h5>
                  <Row className="mb-3">
                    {Object.entries(profileData.languageProgresses).map(([language, level]) => (
                      <Col key={language} xs={6} md={6} lg={4} className="mb-2 mt-3">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Card className="language-card">
                            <Card.Body className="p-2">
                              <Card.Title className="mb-0 fs-6">{language}</Card.Title>
                              <div className="mt-1">
                                {[...Array(4)].map((_, i) => (
                                  <FaStar key={i} className={i < getLevelStars(level) ? "text-warning" : "text-secondary"} />
                                ))}
                              </div>
                            </Card.Body>
                          </Card>
                        </motion.div>
                      </Col>
                    ))}
                  </Row>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="custom" onClick={handleEditProfile} className="mt-3 w-100 edit-profile-btn">
                      <FaEdit className="me-2" /> Edit Your Profile
                    </Button>
                  </motion.div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>
      <EditProfileModal show={showEditModal} handleClose={handleCloseModal} profileData={profileData} handleSave={handleSaveProfile} />
    </div>
  );
};

export default UserProfile;