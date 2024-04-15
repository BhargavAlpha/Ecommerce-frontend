import React, { useState } from 'react';
import axios from 'axios';
import styles from './Signup.module.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  
  const showToast = (message, type) => {
    toast(message, { type });
  };

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    userType: '' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/register', formData);
      if (response.data.name) {
        localStorage.setItem("email", formData.email);
        localStorage.setItem("role", formData.userType);
        showToast("Registered Successfully!", "success");
        navigate("/dashboard");
      } else if (response.data.error) {
        if (response.data.error.includes("User already exists")) {
          showToast("User already exists!", "error");
        } else {
          showToast(response.data.error, "error");
        }
      } else {
        showToast("An error occurred. Please try again later.", "error");
      }
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Create an account</h1>
        <input
          type="text"
          className={styles.input}
          placeholder="Name"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          className={styles.input}
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className={styles.options}>
          <input
            type="radio"
            name="userType"
            value="teamMember"
            checked={formData.userType === 'teamMember'}
            onChange={handleChange}
          />
          <span>Team Member</span>
          <input
            type="radio"
            name="userType"
            value="admin"
            checked={formData.userType === 'admin'}
            onChange={handleChange}
          />
          <span>Admin</span>
        </div>
        <button onClick={handleSubmit} className={styles.btn}>Sign Up</button>
        <p>Already have an Account? <a onClick={() => navigate('/login')}>Login</a></p>
      </div>
    </div>
  );
};

export default Signup;
