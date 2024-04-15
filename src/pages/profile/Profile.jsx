import React, { useState } from "react";
import styles from "./Profile.module.css"; // Import styles from your CSS module
import profile from "../../assets/profile.svg";
import axios from "axios";
import { useEffect } from "react";
const Profile = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    role: "",
    requests_count: 0,
    requests_approved: 0,
    requests_rejected: 0
  });

  const getData=async (email)=>{
    try {
      const response = await axios.get('http://localhost:3000/profile', { email });
      console.log(response.data.user);
      return response.data.user;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };
    useEffect(() => {
      const storedEmail = localStorage.getItem('email');
      if (storedEmail) {
        fetchUserData(storedEmail);
      }
    }, []);
  
    const fetchUserData = async (email) => {
      const user = await getData(email);
      if (user) {
        setUserData(user);
      }
    };

  return (
    <div className={styles.container}>
    <div className={styles.card}>
      <div className={styles.comp}>
      <img src={profile} alt="Banner" />
      </div>
      <div className={`${styles.comp} ${styles.name}`}>
        {userData.username}
      </div>
      <div className={`${styles.comp} ${styles.email}`}>
      {userData.email}
      </div>
      <div className={`${styles.comp} ${styles.role}`}>
       {userData.isAdmin ? "Admin" :"Team Member"}
      </div>
      <div className={`${styles.comp} ${styles.desc}`}>
      Total Requests : {userData.requests_count}
      </div>
      <div className={`${styles.comp} ${styles.desc}`}>
      Approved Requests : {userData.requests_approved}
      </div>
      <div className={`${styles.comp} ${styles.desc}`}>
       Rejected Requests : {userData.requests_rejected}
      </div>
      
    </div>
    </div>
  );
};

export default Profile;
