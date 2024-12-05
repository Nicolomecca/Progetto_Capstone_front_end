import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const EditProfileModal = ({ show, handleClose, profileData, handleSave }) => {
  const [formData, setFormData] = useState({
    name: profileData.name,
    surname: profileData.surname,
    userName: profileData.userName,
    email: profileData.email,
    password: '' 
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const dataToSave = {
      ...formData,
      password: formData.password || 'NO_CHANGE'
    };
    handleSave(dataToSave);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" className="edit-profile-modal">
      <Modal.Header closeButton className="bg-black text-white custom-close">
        <Modal.Title>Edit Your Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-black text-white">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Surname</Form.Label>
            <Form.Control type="text" name="surname" value={formData.surname} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="userName" value={formData.userName} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password (leave blank to keep current)</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password or leave blank"
              />
              <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </Form.Group>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="custom" type="submit" className="w-100 mt-3">
              Save Changes
            </Button>
          </motion.div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProfileModal;